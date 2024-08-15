import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Card } from 'src/modules/cards/entities/card.entity';

@Entity('lists')
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ManyToOne(() => User, (user) => user.lists)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @OneToMany(() => Card, (card) => card.list, { onDelete: 'CASCADE' })
  cards: Card[];
}
