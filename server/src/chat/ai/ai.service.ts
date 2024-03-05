import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async sendMessage(message: string) {
    const agent = new HttpsProxyAgent(
      'http://ambepdbv:kjffyp60bga2@38.154.227.167:5868',
    );

    const openai = new OpenAI({
      apiKey: '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',
      httpAgent: agent,
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: message }],
      model: 'gpt-3.5-turbo',
      stream: true,
    });
    for await (const part of completion) {
      console.log(part.choices[0].delta.content);
    }

    return 'asdasd';
  }
}
