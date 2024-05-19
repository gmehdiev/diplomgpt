import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { ProfileService } from './profile/profile.service';
import { UserResponse } from './response/user.response';
import { ProfileResponse } from './profile/response/Profile.response';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getUser(@Req() req: Request) {
    const user = await this.userService.findOne(req.body.user.uuid);
    const userProfile = await this.profileService.getUserData(
      req.body.user.uuid,
    );
    console.log(user);
    return {
      user: new UserResponse(user),
      profile: new ProfileResponse(userProfile),
    };
  }

  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
