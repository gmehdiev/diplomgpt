import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { AiService } from './ai/ai.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly aiService: AiService,
  ) {}

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
    });
  }

  async testAiService(message: string) {
    return this.aiService.sendMessage(message)
  }
}
