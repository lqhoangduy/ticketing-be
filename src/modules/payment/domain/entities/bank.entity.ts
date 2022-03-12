import { UserEntity } from '../../../user/domain/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '../../../order/domain/entities/order.entity';

@Entity({ name: 'Bank' })
export class BankEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @Column({ type: 'uuid', name: 'userId' })
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user!: UserEntity;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  cardHolderName!: string;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  creditNumber!: string;

  @OneToMany(() => OrderEntity, (order) => order.bank)
  banks: OrderEntity[];
}
