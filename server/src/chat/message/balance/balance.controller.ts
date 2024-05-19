import { Body, Controller, Post, Res } from '@nestjs/common';
import { BalanceDto } from './dto/balance.dto';
import { BalanceService } from './balance.service';
import { Decimal } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}
  @Post()
  async updateUserBalance(@Body() body: BalanceDto, @Res() res: Response) {
    const user = await this.balanceService.changeBalance(
      new Decimal(body.balance),
      body.uuid,
    );
    return res.status(200).json(user.balance);
  }
}
