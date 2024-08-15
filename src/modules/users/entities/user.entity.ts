import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { List } from 'src/modules/lists/entities/list.entity';
import { Card } from 'src/modules/cards/entities/card.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 100, select: false })
  password: string;

  @OneToMany(() => List, (list) => list.author)
  lists: List[];

  @OneToMany(() => Card, (card) => card.author)
  cards: Card[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
