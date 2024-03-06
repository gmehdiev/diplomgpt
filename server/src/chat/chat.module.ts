import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';
import { HttpModule } from '@nestjs/axios';
import { MessageModule } from './message/message.module';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  providers: [ChatService, AiService],
  controllers: [ChatController],
  imports: [AiModule, HttpModule, MessageModule, ProxyModule],
})
export class ChatModule {}
