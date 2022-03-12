import { ApiProperty } from '@nestjs/swagger';
export class BankDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  cardHolderName?: string;

  @ApiProperty()
  creditNumber?: string;
}
