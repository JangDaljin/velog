import { MikroORM } from '@mikro-orm/sqlite';
import config from './config';

export * from './entities';

export async function connect() {
  try {
    const orm = await MikroORM.init(config);
    await orm.connect();
    if (!(await orm.schema.ensureDatabase())) {
      orm.schema.createDatabase();
    }

    return orm;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
