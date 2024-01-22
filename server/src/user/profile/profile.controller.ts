import {
  Body,
  Controller,
  ParseFilePipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ProfileDto } from './dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3clientService } from 'src/s3client/s3client.service';
import { PrismaService } from '@prisma/prisma.service';
@Controller('profile')
export class ProfileController {
  constructor(
    private readonly s3clientService: S3clientService,
    private readonly prismaService: PrismaService,
  ) {}
  @Patch('')
  async updateProfile(
    @Body() dto: ProfileDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    console.log(req);
  }

  @Post('test')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: ProfileDto,
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    const result = await this.s3clientService.uploadAvatar(
      file.originalname,
      file.buffer,
      body.uuid,
    );

    const profile = await this.prismaService.profile.update({
      where: {
        uuid: body.uuid,
      },
      data: {
        avatar: result,
      },
    });
    res.json(profile);
  }
}
