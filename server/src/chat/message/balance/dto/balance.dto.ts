import { IsString } from 'class-validator';

export class BalanceDto {
  @IsString()
  uuid: string;
  @IsString()
  balance: string;
}
