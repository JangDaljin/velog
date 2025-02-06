import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post-entity';

@Entity({ name: 'Post' })
export class User {
  @PrimaryGeneratedColumn({
    comment: '아이디',
    unsigned: true,
    type: 'integer',
  })
  id!: number;

  @Column({
    comment: '이름',
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  name!: string;

  @Column({
    comment: '나이',
    type: 'integer',
    nullable: false,
    default: 0,
  })
  @Index()
  age!: number;

  @Column({
    comment: '생성일자',
    type: 'datetime',
    nullable: false,
    default: () => `strftime('%Y-%m-%d %H:%M:%f', 'now')`,
  })
  createdAt!: Date;

  @Column({
    comment: '수정일자',
    type: 'datetime',
    nullable: false,
    default: () => `strftime('%Y-%m-%d %H:%M:%f', 'now')`,
  })
  updatedAt!: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
