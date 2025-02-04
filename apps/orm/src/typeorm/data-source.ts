import path from 'path';
import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'sqlite',
  database: path.join(__dirname, '..', '..', 'db', 'schema.db'),

  logging: true,

  entities: [path.join(__dirname, 'entities', '**', '*-entity.{t,j}s')],
  migrations: [path.join(__dirname, 'migrations', '**', '*.{t,j}s')],
  subscribers: [],
});
