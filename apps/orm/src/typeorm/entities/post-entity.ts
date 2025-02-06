import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user-entity';

@Entity({ name: 'User' })
export class Post {
  @PrimaryGeneratedColumn({
    comment: '아이디',
    unsigned: true,
    type: 'integer',
  })
  id!: number;

  @Column({
    comment: '제목',
    type: 'varchar',
    length: 255,
    nullable: false,
    default: '',
  })
  title!: string;

  @Column({
    comment: '내용',
    type: 'text',
    nullable: false,
    default: '',
  })
  content!: string;

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

  @Column({ type: 'int', unsigned: true, nullable: false })
  userId!: number;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user!: User;
}
