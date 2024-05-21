import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfileService } from '@user/profile/profile.service';

@Injectable()
export class ProfileOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly profileService: ProfileService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.body.user;
    const profileUuid = request.params.uuid;
    const profile = await this.profileService.getUserData(user.uuid);
    console.log(profile)
    if (profile.uuid !== profileUuid) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
