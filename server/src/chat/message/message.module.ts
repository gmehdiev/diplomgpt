import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { ProxyModule } from '../proxy/proxy.module';

@Module({
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
  imports: [ProxyModule],
})
export class MessageModule { }
