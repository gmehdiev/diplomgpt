import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';

import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@auth/guard/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ChatModule } from './chat/chat.module';
import { S3clientModule } from './s3client/s3client.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    JwtModule,
    ChatModule,
    S3clientModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
