import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Card } from 'src/modules/cards/entities/card.entity';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ name: 'creator_id', nullable: true })
  creatorId: string;

  @ManyToOne(() => User, (user) => user.lists)
  creator: User;

  @OneToMany(() => Card, (card) => card.list, { onDelete: 'CASCADE' })
  cards: Card[];
}
