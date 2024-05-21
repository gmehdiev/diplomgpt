import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { HttpModule } from '@nestjs/axios';
import { MessageModule } from './message/message.module';
import { ProfileService } from '@user/profile/profile.service';
import { ProfileOwnershipGuard } from './quard/profile.quard';

@Module({
  providers: [ChatService, ProfileOwnershipGuard, ProfileService],
  controllers: [ChatController],
  imports: [HttpModule, MessageModule],
})
export class ChatModule {}
