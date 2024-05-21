import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';
import { ProxyModule } from '../proxy/proxy.module';
import { BalanceModule } from './balance/balance.module';
import { BalanceService } from './balance/balance.service';
import { ProfileService } from '@user/profile/profile.service';
import { ChatService } from '../chat.service';

@Module({
  providers: [
    MessageService,
    MessageGateway,
    BalanceService,
    ProfileService,
    ChatService,
  ],
  controllers: [MessageController],
  imports: [ProxyModule, BalanceModule],
})
export class MessageModule {}
