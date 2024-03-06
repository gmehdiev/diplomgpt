import { Injectable } from '@nestjs/common';
import { AiRole, CurrentMessage } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

@Injectable()
export class MessageService {
  constructor(private readonly prismaService: PrismaService) {}
  private convertMessage(messages: CurrentMessage[]) {
    const convertedMessages = messages.map<ChatCompletionMessageParam>(
      (item) => {
        return {
          role: item.role,
          content: item.content,
        };
      },
    );
    return convertedMessages;
  }

  async allMessages(chatUuid: string, isSelected?: boolean) {
    const newMessages = await this.prismaService.message.findMany({
      where: {
        chatUuid,
      },
    });
    const currentMessagesUuid = newMessages.map((item) => item.uuid);
    if (typeof isSelected === 'boolean') {
      const currentMessages = await this.prismaService.currentMessage.findMany({
        where: {
          messageUuid: { in: currentMessagesUuid },
          isSelected: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });
      return currentMessages;
    }
    const currentMessages = await this.prismaService.currentMessage.findMany({
      where: {
        messageUuid: { in: currentMessagesUuid },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return currentMessages;
  }

  async addUserMessage(chatUuid: string, message: string) {
    const messages = await this.prismaService.message.create({
      data: {
        chatUuid,
      },
    });

    await this.prismaService.currentMessage.create({
      data: {
        messageUuid: messages.uuid,
        content: message,
        role: AiRole.user,
      },
    });

    const assistanMessage = await this.prismaService.message.create({
      data: {
        chatUuid,
      },
    });

    const assistanCurrentMessage =
      await this.prismaService.currentMessage.create({
        data: {
          messageUuid: assistanMessage.uuid,
          content: '',
          role: AiRole.assistant,
        },
      });

    const currentMessages = await this.allMessages(chatUuid, true);

    return {
      assistantMessageUuid: assistanMessage.uuid,
      assistanCurrentMessageUuid: assistanCurrentMessage.uuid,
      convertedMessages: this.convertMessage(currentMessages),
    };
  }

  async saveAssistantMessage(currentMessagesUuid: string, content: string) {
    await this.prismaService.currentMessage.update({
      where: {
        uuid: currentMessagesUuid,
      },
      data: {
        content,
      },
    });
  }

  async regenerateAssistantMessage(chatUuid: string, messageUuid: string) {
    console.log(messageUuid);
    await this.prismaService.currentMessage.updateMany({
      where: {
        messageUuid: messageUuid,
      },
      data: {
        isSelected: false,
      },
    });

    const assistanCurrentMessage =
      await this.prismaService.currentMessage.create({
        data: {
          messageUuid: messageUuid,
          content: '',
          role: AiRole.assistant,
        },
      });

    const currentMessages = await this.allMessages(chatUuid, true);

    return {
      assistantMessageUuid: messageUuid,
      assistanCurrentMessageUuid: assistanCurrentMessage.uuid,
      convertedMessages: this.convertMessage(currentMessages),
    };
  }
}
