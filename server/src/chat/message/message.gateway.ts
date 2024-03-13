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
import { ProxyService } from '../proxy/proxy.service';
import { MessageResponse } from './interface';

@WebSocketGateway(3001, {
  namespace: 'events',
  cors: {
    origin: true,
    credentials: true,
  },
})
export class MessageGateway implements OnGatewayConnection {
  constructor(
    private readonly messageService: MessageService,
    private readonly proxyService: ProxyService,
  ) {}

  @WebSocketServer()
  server: Server;
  handleConnection(client: any) {}
  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any): Promise<string> {
    console.log(payload);

    const messages = await this.messageService.addUserMessage(
      payload.chatUuid,
      payload.message,
    );
    await this.sendMessage(messages);
    return 'Hello world!';
  }
  @SubscribeMessage('regenerate')
  async regenerate(client: any, payload: any): Promise<any> {
    const messages = await this.messageService.regenerateAssistantMessage(
      payload.chatUuid,
      payload.messageUuid,
    );
    await this.sendMessage(messages);
  }

  @SubscribeMessage('getMessages')
  async getMessages(client: any, payload: { chatUuid: string }): Promise<any> {
    const messages = await this.messageService.allMessages(payload.chatUuid);
    this.server.emit('messages', messages);
  }
  private async sendMessage(
    messages: MessageResponse | Omit<MessageResponse, 'userMessage'>,
  ) {
    const apiKey = await this.proxyService.getApiKey();
    console.log(messages);
    if (!apiKey) {
      this.server.emit('events', {
        path: null,
        assistantMessageUuid: messages.assistantMessageUuid,
        assistanCurrentMessageUuid: messages.assistanCurrentMessageUuid,
      });
      return;
    }
    const agent = new HttpsProxyAgent(apiKey.proxy);

    const openai = new OpenAI({
      apiKey: apiKey.apiKey,
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

    const completion = await openai.chat.completions.create({
      messages: messages.convertedMessages,
      model: 'gpt-3.5-turbo',
      stream: true,
    });
    const accumulate: string[] = [];
    for await (const part of completion) {
      console.log(part.choices[0].delta.content);
      accumulate.push(part.choices[0].delta.content);
      this.server.emit('events', {
        path: part.choices[0].delta.content,
        assistantMessageUuid: messages.assistantMessageUuid,
        assistanCurrentMessageUuid: messages.assistanCurrentMessageUuid,
      });
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
