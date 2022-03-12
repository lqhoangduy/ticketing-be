import { EventEntity } from './event.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'EventCategory' })
export class EventCategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ nullable: false, type: 'varchar' })
  name!: string;

  @OneToMany(() => EventEntity, (event) => event.category)
  events: EventEntity[];
}
