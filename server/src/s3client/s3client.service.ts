import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3clientService {
  constructor(private readonly configService: ConfigService) {}
  readonly s3client = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('ACCESS_KEY'),
      secretAccessKey: this.configService.get('SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('BUCKET_REGION'),
    endpoint: this.configService.get('ENDPOINT'),
  });

  async uploadAvatar(fileName: string, file: Buffer, uuid: string) {
    const listCommand = new ListObjectsV2Command({
      Bucket: 'gpt',
      Prefix: `${uuid}/avatar`,
    });
    const list = await this.s3client.send(listCommand);

    await this.s3client.send(
      new DeleteObjectsCommand({
        Bucket: 'gpt',
        Delete: {
          Objects: list.Contents.map((item) => ({ Key: item.Key })),
          Quiet: false,
        },
      }),
    );
    await this.s3client.send(
      new PutObjectCommand({
        Bucket: 'gpt',
        Key: `${uuid}/avatar/${fileName}`,
        Body: file,
      }),
    );

    return `https://gpt.obs.ru-moscow-1.hc.sbercloud.ru/${uuid}/avatar/${fileName}`;
  }
}
