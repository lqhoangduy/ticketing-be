import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class WalletUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  walletAddress!: string;
}
