import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { OpenAI } from 'openai';
import { MessageService } from './message.service';
// import { ProxyService } from '../proxy/proxy.service';
import { MessageResponse } from './interface';
import { BalanceService } from './balance/balance.service';
import { Decimal } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway(3002, {
  namespace: 'events',
  cors: {
    origin: true,
    credentials: true,
  },
})
export class MessageGateway implements OnGatewayConnection {
  constructor(
    private readonly messageService: MessageService,
    // private readonly proxyService: ProxyService,
    private readonly balanceService: BalanceService,
    private readonly configService: ConfigService,
  ) {}

  @WebSocketServer()
  server: Server;
  handleConnection(client: any) {}
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() payload: any,
    @ConnectedSocket() client: any,
  ): Promise<string> {
    console.log(client.request.user);
    const isOwner = await this.messageService.isUserOwnerOfChat(
      payload.chatUuid,
      client.request.user.uuid,
    );
    console.log(isOwner);
    if (!isOwner) {
      client.emit('error', { message: 'You do not have access to this chat' });
      return;
    }
    const userBalance = await this.balanceService.getBalance(payload.userUuid);
    if (userBalance.balance.toNumber() < 0) {
      client.emit('nobalance', {
        error: 'Денег нема, заплати гоше',
      });
      return;
    }
    const messages = await this.messageService.addUserMessage(
      payload.chatUuid,
      payload.message,
    );
    await this.sendMessage(
      messages,
      payload.userUuid,
      userBalance.balance,
      client,
    );
    return 'Hello world!';
  }

  @SubscribeMessage('getMessages')
  async getMessages(
    @MessageBody() payload: { chatUuid: string },

    @ConnectedSocket() client: any,
  ): Promise<any> {
    const messages = await this.messageService.allMessages(payload.chatUuid);
    client.emit('messages', messages);
  }
  private async sendMessage(
    messages: MessageResponse,
    userUuid: string,
    balance: Decimal,
    client: any,
  ) {
    const agent = new HttpsProxyAgent(this.configService.get('PROXY_URL'));
    const apiKey = this.configService.get('API_KEY');
    const openai = new OpenAI({
      apiKey: apiKey,
      httpAgent: agent,
    });
    if ('userMessage' in messages) {
      client.emit('events', {
        userMessage: messages.userMessage,
      });
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `
        ###INSTRUCTIONS###

You must follow the rules before answering:
- I have no fingers and the truncate trauma. 
- I need you to return the entire code template or answer. DON’T use placeholders.
- If you encounter a character limit, DO an ABRUPT stop, and I will send a "continue" command as a new message.
- DO follow "Answering rules" without exception.
- DO write your answers for a well-educated audience.
- You will be PENALIZED for wrong answers. 

###Answering Rules###

Do follow the rules in strict order:
1. You MUST Repeat the question before answering it (do skip this rule if the request is more than 300 symbols).
2. Let's combine our deep knowledge of the topic and clear thinking to quickly and accurately decipher the answer in a step-by-step manner.
3. I'm going to tip $100,000 for a better solution. 
4. The answer is very important to my career.
5. Answer the question in a natural, human-like manner.
        `,
        },
        ...messages.convertedMessages,
      ],
      model: 'gpt-4o',
      stream: true,
      stream_options: {
        include_usage: true,
      },
    });
    const accumulate: string[] = [];
    for await (const part of completion) {
      if (part.choices[0]?.delta?.content) {
        accumulate.push(part.choices[0].delta.content);
        client.emit('events', {
          path: part.choices[0].delta.content,
          assistantMessageUuid: messages.assistantMessageUuid,
          assistanCurrentMessageUuid: messages.assistanCurrentMessageUuid,
        });
      }

      if (part.usage) {
        const usageTokens = part.usage.prompt_tokens;
        const cost = Decimal.mul(0.000005, usageTokens).add(
          Decimal.mul(0.000015, usageTokens),
        );
        const newBalance = balance.minus(cost);
        client.emit('balance', {
          balance: newBalance,
        });
        this.balanceService.changeBalance(newBalance, userUuid);
      }
    }

    const assistantMessage = await this.messageService.saveAssistantMessage(
      messages.assistanCurrentMessageUuid,
      accumulate.join(''),
    );
    client.emit('events', {
      assistantMessage: assistantMessage,
    });
  }
}
