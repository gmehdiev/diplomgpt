import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponse implements User {
  uuid: string;
  email: string;
  @Exclude()
  password: string;
  isActivated: boolean;
  @Exclude()
  activationLink: string;
  @Exclude()
  rememberMe: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
