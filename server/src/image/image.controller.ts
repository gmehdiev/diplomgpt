import { Body, Controller, Post, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import OpenAI from 'openai';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post('')
  async generateImages() {
    await this.imageService.openAi();
    
  }
}
