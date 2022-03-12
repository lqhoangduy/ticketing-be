import { BankEntity } from '../../../payment/domain/entities/bank.entity';
import { UserEntity } from './../../../user/domain/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusEnum } from '../enums/status.enum';
import { EventEntity } from 'src/modules/event/domain/entities/event.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'Order' })
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id!: string;

  @Column({ type: 'uuid' })
  eventId: string;

  @ManyToOne(() => EventEntity, (event) => event.id)
  @JoinColumn({ name: 'eventId' })
  @AutoMap({ typeFn: () => EventEntity })
  event: EventEntity;

  @Column({ type: 'uuid' })
  @AutoMap()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'uuid' })
  bankId: string;

  @ManyToOne(() => BankEntity, (bank) => bank.id)
  @JoinColumn()
  bank: BankEntity;

  @Column({ nullable: false, type: 'float' })
  @AutoMap()
  amount!: number;

  @Column({ nullable: true, type: 'simple-array' })
  @AutoMap()
  tickets?: string[];

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.Progress,
  })
  @AutoMap()
  status!: StatusEnum;

  @Column({ nullable: true, type: 'date' })
  paymentDate?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
