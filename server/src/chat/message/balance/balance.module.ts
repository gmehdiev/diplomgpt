import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
  providers: [BalanceService],
  controllers: [BalanceController]
})
export class BalanceModule {}
