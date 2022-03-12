import { EventEntity } from './../../../event/domain/entities/event.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GenderEnum } from '../enums/gender.enum';
import { RoleEntity } from './../../../role-permission/domain/entities/role.entity';
import { OrderEntity } from './../../../order/domain/entities/order.entity';
import { Exclude } from 'class-transformer';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'User' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id!: string;

  @Column({ nullable: false, length: 100, type: 'varchar' })
  @AutoMap()
  name!: string;

  @Column({ nullable: false, length: 100, type: 'varchar' })
  @AutoMap()
  email!: string;

  @Column({ nullable: false, length: 100, type: 'varchar' })
  username!: string;

  @Column({ nullable: true, type: 'varchar' })
  password?: string;

  @Column({ nullable: true, type: 'date' })
  @AutoMap()
  birthday?: string;

  @Column({ nullable: true, length: 11, type: 'varchar' })
  @AutoMap()
  numberPhone?: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: GenderEnum,
  })
  @AutoMap()
  gender?: GenderEnum;

  @Column({ nullable: true, type: 'text' })
  @AutoMap()
  avatar?: string;

  @Column({ type: 'uuid' })
  roleId!: string;

  @Exclude()
  @ManyToOne(() => RoleEntity, (role) => role.id, { eager: true })
  @JoinColumn({ name: 'roleId' })
  @AutoMap({ typeFn: () => RoleEntity })
  role!: RoleEntity;

  @Column({ nullable: false, type: 'boolean', default: false })
  @AutoMap()
  isSocial!: boolean;

  @Column({ nullable: true, type: 'boolean', default: false })
  @AutoMap()
  isDeleted?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];
}
