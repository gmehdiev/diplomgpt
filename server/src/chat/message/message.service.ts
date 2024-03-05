import { Injectable } from '@nestjs/common';
import { AiRole } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}

  async addMessage(
    chatUuid: string,
    message: string,
    role: AiRole,
  ): Promise<ChatCompletionMessageParam[]> {
    const messages = await this.prismaService.message.create({
      data: {
        chatUuid,
      },
    });

    await this.prismaService.currentMessage.create({
      data: {
        messageUuid: messages.uuid,
        content: message,
        role,
      },
    });


    const newMessages = await this.prismaService.message.findMany({
      where: {
        chatUuid,
      },
    });
    const currentMessagesUuid = newMessages.map((item) => item.uuid);

    const currentMessages = await this.prismaService.currentMessage.findMany({
      where: {
        messageUuid: { in: currentMessagesUuid },
        isSelected: true,
      },
    });

    const filteredCurrentMessages = currentMessages.map((item) => {
      return {
        role: item.role,
        content: item.content,
      };
    }) as unknown as ChatCompletionMessageParam[];
    return filteredCurrentMessages;
  }

  
}
