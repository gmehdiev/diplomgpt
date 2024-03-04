import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [ImageService],
  imports: [HttpModule],
  controllers: [ImageController],
})
export class ImageModule {}
