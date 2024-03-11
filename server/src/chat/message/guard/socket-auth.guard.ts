import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as cookie from 'cookie';

export class AuthenticatedWsIoAdapter extends IoAdapter {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  createIOServer(port: number, options?: ServerOptions): any {
    options.allowRequest = async (request, allowFunction) => {
      const cookies = cookie.parse(request.headers.cookie || '');
      const token = cookies?.token?.split(' ')[1];
      if (!token) {
        return allowFunction('FORBIDDEN', false);
      }

      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('JWT_SECRET_ACCESS'),
        });
        if (payload) {
          return allowFunction(null, true);
        }
      } catch (error) {
        return allowFunction('FORBIDDEN', false);
      }
    };
    return super.createIOServer(port, options);
  }
}
