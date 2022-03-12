import { GenderEnum } from './../../user/domain/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  gender?: GenderEnum;

  @ApiProperty()
  birthday?: string;

  @ApiProperty()
  numberPhone?: string;

  @ApiProperty()
  avatar?: string;
}
