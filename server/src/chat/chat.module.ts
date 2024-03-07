import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HttpModule } from '@nestjs/axios';
import { MessageModule } from './message/message.module';

@Module({
  providers: [ChatService],
  controllers: [ChatController],
  imports: [HttpModule, MessageModule],
})
export class ChatModule { }
