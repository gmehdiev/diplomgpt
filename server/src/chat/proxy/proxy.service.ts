import { BadGatewayException, Injectable } from '@nestjs/common';
import { ProxyDto } from './dto/proxy.dto';
import { HttpsProxyAgent } from 'https-proxy-agent';
import OpenAI from 'openai';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ProxyService {
    constructor(private readonly prismaService: PrismaService) { }

    async validateApiKey(dto: ProxyDto) {
        const isExist = await this.prismaService.apiKeys.findUnique({
            where: {
                apiKey: dto.apiKey,
            },
        });

        if (isExist) {
            throw new BadGatewayException('Уже существевт');

        }
        const agent = new HttpsProxyAgent(
            `http://${dto.proxyUsername}:${dto.proxyPassword}@${dto.proxyAddress}:${dto.proxyPort}`,
        );
        const openai = new OpenAI({
            apiKey: dto.apiKey,
            httpAgent: agent,
        });
        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: 'asd' }],
            model: 'gpt-3.5-turbo',
        });
        if (completion.choices[0].message.content) {
            await this.prismaService.apiKeys.create({
                data: {
                    proxyUsername: dto.proxyUsername,
                    proxyPassword: dto.proxyPassword,
                    proxyAddress: dto.proxyAddress,
                    proxyPort: dto.proxyPort,
                    apiKey: dto.apiKey,
                },
            });
            return;
        }
        throw new BadGatewayException('Неверный апи ключ или прокси');
    }
}
