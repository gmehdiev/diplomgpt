import { Profile } from '@prisma/client';

export class ProfileResponse implements Profile {
  uuid: string;
  nickName: string;
  avatar: string;
  balance: number;
  userUuid: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(partial: Partial<Profile>) {
    Object.assign(this, partial);
  }
}
