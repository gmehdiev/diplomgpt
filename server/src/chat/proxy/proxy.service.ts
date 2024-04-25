import { BadGatewayException, Injectable } from '@nestjs/common';
import { ProxyDto } from './dto/proxy.dto';
import { HttpsProxyAgent } from 'https-proxy-agent';
import OpenAI from 'openai';
import { PrismaService } from '@prisma/prisma.service';
import { ProxyResponse } from './interface';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProxyService {
  constructor(private readonly prismaService: PrismaService) {}
  private async validateApiKey(proxyLink: string, apiKey: string) {
    const agent = new HttpsProxyAgent(proxyLink);
    const openai = new OpenAI({
      apiKey: apiKey,
      httpAgent: agent,
    });
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: 'asd' }],
      model: 'gpt-3.5-turbo',
    });
    return completion.choices[0].message.content ? apiKey : null;
  }

  async addKey(dto: ProxyDto) {
    const isExist = await this.prismaService.apiKeys.findUnique({
      where: {
        apiKey: dto.apiKey,
      },
    });
    if (isExist) {
      throw new BadGatewayException('Уже существевт');
    }
    const proxyLink = `http://${dto.proxyUsername}:${dto.proxyPassword}@${dto.proxyAddress}:${dto.proxyPort}`;
    const isValid = this.validateApiKey(proxyLink, dto.apiKey);
    if (isValid) {
      await this.prismaService.apiKeys.create({
        data: {
          proxyLink: `http://${dto.proxyUsername}:${dto.proxyPassword}@${dto.proxyAddress}:${dto.proxyPort}`,
          apiKey: dto.apiKey,
          usedAt: new Date(Date.now()),
          usedCount: 0,
        },
      });
      return;
    }
    throw new BadGatewayException('Неверный апи ключ или прокси');
  }

  // @Cron('* * * * *')
  // async validateCron() {
  //   const apiKey = await this.prismaService.apiKeys.findMany({
  //     where: {
  //       usedCount: {
  //         gte: 4,
  //       },
  //       isWork: true,
  //     },
  //   });

  //   const apiKeys= apiKey.map((key)=> this.validateApiKey(key.proxyLink, key.apiKey))
  // }

  @Cron('* * * * *')
  async refreshKeys() {
    await this.prismaService.apiKeys.updateMany({
      where: {
        isWork: true,
        usedAt: {
          lt: new Date(Date.now() - 60 * 1000),
        },
        usedCount: {
          gte: 4,
        },
      },
      data: {
        usedCount: 0,
      },
    });
  }

  async getApiKey(): Promise<ProxyResponse | null> {
    const apiKey = await this.prismaService.apiKeys.findFirst({
      where: {
        usedCount: {
          lte: 3,
        },
        isWork: true,
      },
    });

    if (!apiKey) return null;
    await this.prismaService.apiKeys.update({
      where: {
        uuid: apiKey.uuid,
      },
      data: {
        usedCount: { increment: 1 },
        usedAt: new Date(Date.now()),
      },
    });
    return {
      apiKey: apiKey.apiKey,
      proxy: apiKey.proxyLink,
    };
  }
}
