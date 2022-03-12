import { UserEntity } from './../../../user/domain/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Wallet' })
export class WalletEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', name: 'userId' })
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: false, type: 'varchar' })
  walletAddress!: string;

  @Column({ nullable: false, type: 'varchar' })
  mnemonic!: string;
}
