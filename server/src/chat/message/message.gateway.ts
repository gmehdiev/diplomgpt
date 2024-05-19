import {
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
  async handleMessage(client: any, payload: any): Promise<string> {
    const userBalance = await this.balanceService.getBalance(payload.userUuid);
    console.log(userBalance.balance.toNumber());
    if (userBalance.balance.toNumber() < 0) {
      this.server.emit('nobalance', {
        error: 'Денег нема, заплати гоше',
      });
      return;
    }
    const messages = await this.messageService.addUserMessage(
      payload.chatUuid,
      payload.message,
    );
    await this.sendMessage(messages, payload.userUuid, userBalance.balance);
    return 'Hello world!';
  }
  // @SubscribeMessage('regenerate')
  // async regenerate(client: any, payload: any): Promise<any> {
  //   const messages = await this.messageService.regenerateAssistantMessage(
  //     payload.chatUuid,
  //     payload.messageUuid,
  //   );
  //   await this.sendMessage(messages);
  // }

  @SubscribeMessage('getMessages')
  async getMessages(client: any, payload: { chatUuid: string }): Promise<any> {
    const messages = await this.messageService.allMessages(payload.chatUuid);
    this.server.emit('messages', messages);
  }
  private async sendMessage(
    messages: MessageResponse,
    userUuid: string,
    balance: Decimal,
  ) {
    console.log(123123, messages);
    // const apiKey = await this.proxyService.getApiKey();
    // if (!apiKey) {
    //   this.server.emit('events', {
    //     path: null,
    //     assistantMessageUuid: messages.assistantMessageUuid,
    //     assistanCurrentMessageUuid: messages.assistanCurrentMessageUuid,
    //   });
    //   return;
    // }
    const agent = new HttpsProxyAgent(this.configService.get('PROXY_URL'));
    const apiKey = this.configService.get('API_KEY');
    const openai = new OpenAI({
      apiKey: apiKey,
      httpAgent: agent,
    });
    if ('userMessage' in messages) {
      this.server.emit('events', {
        // path: part.choices[0].delta.content,
        // assistantMessageUuid: messages.assistantMessageUuid,
        // assistanCurrentMessageUuid: messages.assistanCurrentMessageUuid,
        userMessage: messages.userMessage,
      });
    }
    console.log(userUuid);

    const completion = await openai.chat.completions.create({
      messages: messages.convertedMessages,
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
        this.server.emit('events', {
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

        this.balanceService.changeBalance(newBalance, userUuid);
      }
    }

    const assistantMessage = await this.messageService.saveAssistantMessage(
      messages.assistanCurrentMessageUuid,
      accumulate.join(''),
    );
    this.server.emit('events', {
      assistantMessage: assistantMessage,
    });
  }
}
