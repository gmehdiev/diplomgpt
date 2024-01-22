import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { Token, User } from '@prisma/client';
import { UserService } from '@user/user.service';
import { v4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './interface';
import { PrismaService } from '@prisma/prisma.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { ProfileService } from '@user/profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly jwtSetvice: JwtService,
    private readonly prismaService: PrismaService,
    private readonly profileService: ProfileService,
  ) {}
  async register(dto: RegisterDto, agent: string) {
    const isExist: User = await this.userService.findOne(dto.email);
    if (isExist) {
      throw new ConflictException(
        'Пользователь с таким логином и паролем уже зареган',
      );
    }
    const activationLink = v4();

    // await this.sendConfirmMail(
    //   dto.email,
    //   `${this.configService.get('API_URL') + activationLink}`,
    // );

    const user: User = await this.userService.save({ ...dto, activationLink });
    await this.profileService.createProfile(user.uuid);
    return this.generateTokens(user, agent);
  }

  async login(dto: LoginDto, agent: string) {
    const user: User = await this.userService.findOne(dto.email);

    if (!user || !compareSync(dto.password, user.password)) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    return this.generateTokens(user, agent);
  }

  private async generateTokens(
    user: User,
    agent: string,
    rememberMe?: boolean,
  ): Promise<Tokens> {
    const accessToken =
      `Bearer ` +
      this.jwtSetvice.sign(
        {
          uuid: user.uuid,
          email: user.email,
          agent,
        },
        {
          expiresIn: '1d',
          secret: this.configService.get('JWT_SECRET_ACCESS'),
        },
      );
    const refreshToken = this.jwtSetvice.sign(
      {
        uuid: user.uuid,
        email: user.email,
        agent,
      },
      {
        expiresIn: rememberMe ? '30d' : '1d',
        secret: this.configService.get('JWT_SECRET_REFRESH'),
      },
    );
    await this.saveRefreshToken(user.uuid, refreshToken, agent);
    return { accessToken, refreshToken };
  }

  private async saveRefreshToken(
    uuid: string,
    refreshToken: string,
    agent: string,
  ): Promise<Token> {
    const _token = await this.prismaService.token.findFirst({
      where: {
        userUuid: uuid,
        userAgent: agent,
      },
    });
    const token = _token?.refreshToken ?? '';
    return this.prismaService.token.upsert({
      where: { refreshToken: token },
      update: {
        refreshToken: refreshToken,
      },
      create: {
        refreshToken,
        userUuid: uuid,
        userAgent: agent,
      },
    });
  }

  async refreshTokens(refreshToken: string, agent: string) {
    const isExist = await this.prismaService.token.findUnique({
      where: { refreshToken },
    });

    if (!isExist) {
      throw new UnauthorizedException('');
    }

    const deletedToken = await this.prismaService.token.delete({
      where: { refreshToken },
    });

    const user = await this.userService.findOne(deletedToken.userUuid);

    return this.generateTokens(user, agent);
  }

  async deleteRefreshToken(refreshToken: string) {
    return this.prismaService.token.delete({ where: { refreshToken } });
  }

  async sendConfirmMail(email: string, link: string) {
    return await this.mailerService
      .sendMail({
        to: email,
        from: 'pet213299@gmail.com',
        subject: 'Testing Nest MailerModule ✔',
        text: 'welme',
        html: `
        <div>
            <h1>Для активации перейдите по ссылке</h1>
            <a href="${link}">${link}</a>
        </div>
        `,
      })
      .catch((e) => {
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      });
  }

  async valid(refreshToken: string | undefined) {
    return this.prismaService.token.findFirst({
      where: {
        refreshToken: refreshToken ?? '',
      },
    });
  }
}
