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
import { AiRole } from '@prisma/client';

@WebSocketGateway(3001, { namespace: 'events' })
export class MessageGateway implements OnGatewayConnection {
  constructor(private readonly messageService: MessageService) { }

  @WebSocketServer()
  server: Server;
  handleConnection(client: any) { }
  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any): Promise<string> {
    const messages = await this.messageService.addUserMessage(
      payload.chatUuid,
      payload.message,
    );



    const completion = await openai.chat.completions.create({
      messages: messages.convertedMessages,
      model: 'gpt-3.5-turbo',
      stream: true,
    });
    console.log(messages.convertedMessages)
    const accumulate: string[] = [];
    for await (const part of completion) {
      console.log(part.choices[0].delta.content);
      accumulate.push(part.choices[0].delta.content);
      client.emit('events', {
        path: part.choices[0].delta.content,
        assistantMessageUuid: messages.assistantMessageUuid,
        assistanCurrentMessageUuid: messages.assistanCurrentMessageUuid,
      });
    }

    const result = await this.messageService.saveAssistantMessage(
      messages.assistanCurrentMessageUuid,
      accumulate.join(''),
    );
    console.log(result);
    return 'Hello world!';
  }
  @SubscribeMessage('regenerate')
  async regenerate(client: any, payload: any): Promise<any> {
    console.log(payload);
    const messages = await this.messageService.regenerateAssistantMessage(
      payload.chatUuid,
      payload.messageUuid,
    );

    console.log(messages.convertedMessages)
    const completion = await openai.chat.completions.create({
      messages: messages.convertedMessages,
      model: 'gpt-3.5-turbo',
      stream: true,
    });
    const accumulate: string[] = [];
    for await (const part of completion) {
      console.log(part.choices[0].delta.content);
      accumulate.push(part.choices[0].delta.content);
      client.emit('events', {
        path: part.choices[0].delta.content,
        assistantMessageUuid: messages.assistantMessageUuid,
        assistanCurrentMessageUuid: messages.assistanCurrentMessageUuid,
      });
    }
    await this.messageService.saveAssistantMessage(
      messages.assistanCurrentMessageUuid,
      accumulate.join(''),
    );
  }
}
