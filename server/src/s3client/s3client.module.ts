import { Global, Module } from '@nestjs/common';
import { S3clientService } from './s3client.service';
@Global()
@Module({
  providers: [S3clientService],
  exports: [S3clientService],
})
export class S3clientModule {}
