import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import type { Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { UserDto } from './../dto/user.dto';
import { RoleDto } from 'src/modules/role-permission/dto/role.dto';
import { RoleEntity } from 'src/modules/role-permission/domain/entities/role.entity';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  mapProfile() {
    return (mapper) => {
      mapper.createMap(UserEntity, UserDto);
      mapper.createMap(RoleEntity, RoleDto);
    };
  }
}
