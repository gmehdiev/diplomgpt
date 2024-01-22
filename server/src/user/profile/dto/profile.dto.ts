import { IsString, IsUUID } from 'class-validator';

export class ProfileDto {
  @IsUUID()
  uuid: string;
  @IsString()
  nickName?: string;
}
