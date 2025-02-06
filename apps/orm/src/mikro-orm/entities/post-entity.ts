import { Entity, ManyToOne, Property, TextType } from '@mikro-orm/core';
import { BaseEntity } from './base-entity';
import { UserEntity } from './user-entity';

@Entity({ tableName: 'Post' })
export class PostEntity extends BaseEntity {
  @Property({
    type: TextType,
  })
  title!: string;

  @Property({
    type: TextType,
  })
  content!: string;

  @ManyToOne({ referenceColumnName: 'id', fieldName: 'userId' })
  user!: UserEntity;
}
