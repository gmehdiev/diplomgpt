import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AiService } from './ai/ai.service';
import { AiModule } from './ai/ai.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ChatService, AiService],
  controllers: [ChatController],
  imports: [AiModule, HttpModule]
})
export class ChatModule {}
