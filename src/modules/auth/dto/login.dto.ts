import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class LoginDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  payload: PayloadDto;
}

export class PayloadDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  avatar?: string;
}
