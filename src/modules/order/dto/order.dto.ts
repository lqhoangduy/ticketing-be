import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OrderDto {
  @ApiProperty()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty()
  @IsNotEmpty()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  bankId: string;

  @ApiProperty()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  tickets?: string[];

  count?: number;
}
