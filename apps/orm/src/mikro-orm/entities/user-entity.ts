import {
  Collection,
  Entity,
  IntegerType,
  OneToMany,
  Property,
  TextType,
} from '@mikro-orm/core';
import { BaseEntity } from './base-entity';
import { PostEntity } from './post-entity';

@Entity({ tableName: 'User' })
export class UserEntity extends BaseEntity {
  @Property({
    type: TextType,
  })
  name!: string;

  @Property({
    type: IntegerType,
    index: true,
  })
  age!: number;

  @OneToMany({ mappedBy: 'user' })
  posts = new Collection<PostEntity>(this);
}
