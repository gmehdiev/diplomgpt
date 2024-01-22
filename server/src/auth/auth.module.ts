import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailOptions } from './config';
import { UserModule } from '@user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { GUARDS } from './guard';
import { ProfileModule } from '@user/profile/profile.module';

@Module({
  providers: [AuthService, ...GUARDS],
  controllers: [AuthController],
  imports: [
    UserModule,
    ProfileModule,
    MailerModule.forRootAsync(mailOptions()),
    JwtModule,
  ],
})
export class AuthModule {}
