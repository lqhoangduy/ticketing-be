import { ApiProperty } from '@nestjs/swagger';
export class BankUpdateDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  cardHolderName?: string;

  @ApiProperty()
  creditNumber?: string;
}
