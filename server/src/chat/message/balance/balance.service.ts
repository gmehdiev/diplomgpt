import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class BalanceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBalance(userUuid: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });
    return {
      balance: user.balance,
    };
  }

  async changeBalance(newBalance: Decimal, userUuid: string) {
    return this.prismaService.user.update({
      where: {
        uuid: userUuid,
      },
      data: {
        balance: newBalance,
      },
    });
  }
}
