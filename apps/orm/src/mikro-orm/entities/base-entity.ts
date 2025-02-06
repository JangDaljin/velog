import { OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @PrimaryKey()
  id!: number;

  @Property({
    fieldName: 'createdAt',
    nullable: true,
    onCreate: () => new Date().toISOString(),
  })
  createdAt?: Date;

  @Property({
    fieldName: 'updatedAt',
    nullable: true,
    onCreate: () => new Date().toISOString(),
    onUpdate: () => new Date().toISOString(),
  })
  updatedAt?: Date;
}
