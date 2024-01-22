import { IsString, IsUUID } from 'class-validator';

export class ChatDto {
  @IsUUID()
  profileUuid: string;
}


export class UpdateChatDto {
    @IsString()
    name: string;
}