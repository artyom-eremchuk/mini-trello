import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { List } from 'src/modules/lists/entities/list.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';

@Entity('cards')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ManyToOne(() => User, (user) => user.cards)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => List, (list) => list.cards)
  @JoinColumn({ name: 'list_id' })
  list: List;

  @OneToMany(() => Comment, (comment) => comment.card)
  comments: Comment[];
}
