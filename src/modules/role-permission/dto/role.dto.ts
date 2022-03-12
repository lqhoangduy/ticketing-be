import { AutoMap } from '@automapper/classes';

export class RoleDto {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;
}
