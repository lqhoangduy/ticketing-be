import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'RolePermission' })
export class RolePermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  roleId: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @Column({ type: 'uuid' })
  permissonId: string;

  @ManyToOne(() => PermissionEntity, (permission) => permission.id)
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionEntity;
}
