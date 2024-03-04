import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async sendMessage(message: string) {
    const agent = new HttpsProxyAgent(
      '',
    );

    const openai = new OpenAI({
      apiKey: '',
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
