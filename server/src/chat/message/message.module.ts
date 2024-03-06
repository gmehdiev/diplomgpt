import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';

@Module({
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
})
export class MessageModule {}
