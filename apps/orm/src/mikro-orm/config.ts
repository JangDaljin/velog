import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { defineConfig, SqliteDriver } from '@mikro-orm/sqlite';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig({
  driver: SqliteDriver,
  extensions: [Migrator],
  dbName: './db/schema.db',
  entities: ['./dist/mikro-orm/entities/**/*-entity.js'],
  entitiesTs: ['./src/mikro-orm/entities/**/*-entity.ts'],
  migrations: {
    path: './dist/mikro-orm/migrations',
    pathTs: './src/mikro-orm/migrations',
  },
  metadataProvider: TsMorphMetadataProvider,
  metadataCache: {
    enabled: false,
  },
  debug: true,
});
