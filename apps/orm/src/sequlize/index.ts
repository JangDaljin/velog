import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/schema.db',
});

export async function test(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

export async function connect(): Promise<void> {
  await sequelize.sync();
}

export async function disconnect(): Promise<void> {
  await sequelize.close();
}
