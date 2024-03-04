import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Cookie, Public, UserAgent } from '@common/decorator';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './interface';
import { Response } from 'express';
import { LoginDto } from './dto';

const REFRESH_TOKEN = 'refreshToken';
const ACCESS_TOKEN = 'token';
@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    const tokens = await this.authService.register(dto, agent);
    if (!tokens) {
      throw new BadRequestException(
        `не получаеться зарегать пользователя с анными ${JSON.stringify(dto)}`,
      );
    }
    this.setRefreshTokenToCookies(tokens, res);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    const tokens = await this.authService.login(dto, agent);
    if (!tokens) {
      throw new BadRequestException(
        `не получаеться войти пользователя с анными ${JSON.stringify(dto)}`,
      );
    }
    this.setRefreshTokenToCookies(tokens, res);
  }

  @Get('logout')
  async logout(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      res.sendStatus(HttpStatus.OK);
      return;
    }
    await this.authService.deleteRefreshToken(refreshToken);
    res.cookie(REFRESH_TOKEN, '', {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(HttpStatus.OK);
  }

  @Get('refresh')
  async refresh(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
    @UserAgent() agent: string,
  ) {
    // console.log(refreshToken)
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const token = await this.authService.refreshTokens(refreshToken, agent);
    if (!token) {
      throw new UnauthorizedException();
    }

    this.setRefreshTokenToCookies(token, res);
  }

  @Get('valid')
  async valid(
    @Cookie(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    const isValid = await this.authService.valid(refreshToken);
    res.json({ isValid });
  }
  private setRefreshTokenToCookies(tokens: Tokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }
    res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 2592000000,
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });
    res.cookie(ACCESS_TOKEN, tokens.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
      secure:
        this.configService.get('NODE_ENV', 'development') === 'production',
      path: '/',
    });
    console.log('s end');
    res.status(HttpStatus.CREATED).json({ a: 1 });
  }
}
