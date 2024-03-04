import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [AiService],
  controllers: [AiController],
  imports: [HttpModule],
  exports: [AiService]
})
export class AiModule {}
