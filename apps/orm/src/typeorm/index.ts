import { dataSource } from './data-source';

export * from './data-source';
export * from './entities';

export async function connect(): Promise<void> {
  try {
    await dataSource.initialize();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function disconnect(): Promise<void> {
  try {
    await dataSource.destroy();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
