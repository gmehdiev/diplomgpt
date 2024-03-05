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
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer()
  server: Server;
  handleConnection(client: any) {}
  @SubscribeMessage('message')
  async handleMessage(client: any, payload: any): Promise<string> {
    console.log(payload);
    const messages = await this.messageService.addMessage(
      payload.chatUuid,
      payload.message,
      AiRole.user,
    );
   

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: 'gpt-3.5-turbo',
      stream: true,
    });
    const accumulate: string[] = [];
    for await (const part of completion) {
      console.log(part.choices[0].delta.content);
      accumulate.push(part.choices[0].delta.content);
      client.emit('events', { a: part.choices[0].delta.content });
    }

    const result = await this.messageService.addMessage(
      payload.chatUuid,
      accumulate.join(''),
      AiRole.assistant,
    );
    console.log(asd);
    return 'Hello world!';
  }
}
