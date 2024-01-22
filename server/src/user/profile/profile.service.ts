import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(uuid: string) {
    await this.prismaService.profile.create({
      data: {
        userUuid: uuid,
      },
    });
  }

  async getUserData(userUuid: string) {
   return await this.prismaService.profile.findUnique({
      where: {
        userUuid,
      },
    });
  }
}
