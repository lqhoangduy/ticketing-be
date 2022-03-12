import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleDto } from './../../role-permission/dto/role.dto';
import { GenderEnum } from '../domain/enums/gender.enum';
export class UserDto {
  @ApiProperty()
  @AutoMap()
  id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @AutoMap()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @AutoMap({ typeFn: () => RoleDto })
  role: string;

  @ApiProperty()
  @AutoMap()
  isSocial?: boolean;

  @ApiProperty()
  @AutoMap()
  gender?: GenderEnum;

  @ApiProperty()
  @AutoMap()
  birthday?: string;

  @ApiProperty()
  @AutoMap()
  numberPhone?: string;

  @ApiProperty()
  @AutoMap()
  avatar?: string;

  @ApiProperty()
  @AutoMap()
  isDeleted?: boolean;
}
