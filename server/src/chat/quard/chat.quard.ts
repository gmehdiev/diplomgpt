import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfileService } from '@user/profile/profile.service';
import { ChatService } from '../chat.service';

@Injectable()
export class ChatOwnershipGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly profileService: ProfileService,
    private readonly chatService: ChatService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.body.user;
    const chatUuid = request.params.uuid;
    const profile = await this.profileService.getUserData(user.uuid);
    const chat = await this.chatService.getChatByUuid(chatUuid);
    console.log(chat)
    if (profile.uuid !== chat?.profileUuid) {
      throw new ForbiddenException('Access denied');
    }
    return true;
  }
}
