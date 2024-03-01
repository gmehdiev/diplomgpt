import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import OpenAI from 'openai';

@Injectable()
export class ImageService {
  constructor(private readonly httpService: HttpService) {}

  async openAi() {
    const openai = axios.create({
  
    });
    try {
      const response = await openai.post(
        'https://api.openai.com/v1/images/generations',
        {
          model: 'dall-e-2',
          prompt: 'medieval farmer’s yellow saxophone incrusted with steel and yellow diamonds; 3d, 4k, realism, photo',
          n: 1,
          size: '1024x1024',
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    // return response.data.data[0].url;
  }
}
