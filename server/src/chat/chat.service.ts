import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(uuid: string) {
    return this.prismaService.chat.create({
      data: {
        profileUuid: uuid,
      },
    });
  }

  async delete(uuid: string) {
    const isExist = await this.prismaService.chat.findUnique({
      where: {
        uuid,
      },
    });

    if (!isExist) throw new NotFoundException('Такого чата нет');
    return this.prismaService.chat.delete({
      where: {
        uuid,
      },
    });
  }

  async update(uuid: string, name: string) {
    const isExist = await this.prismaService.chat.findUnique({
      where: {
        uuid,
      },
    });

    if (!isExist) throw new NotFoundException('Такого чата нет');
    return this.prismaService.chat.update({
      where: {
        uuid,
      },
      data: {
        name,
      },
    });
  }

  async getAllChat(uuid: string) {
    return this.prismaService.chat.findMany({
      where: {
        profileUuid: uuid,
      },
      orderBy: {
        createdAt: 'desc', 
      },
    });
  }

  async getChatByUuid(uuid: string) {
    return this.prismaService.chat.findUnique({
      where: {
        uuid,
      }
    })
  }
}
