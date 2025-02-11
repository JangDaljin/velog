import 'reflect-metadata';

import * as MyMikroOrm from './mikro-orm';
import { TypedPrismaClient } from './prisma/prisma-client';
import * as MySequelize from './sequelize';
import * as MyTypeOrm from './typeorm';

main();

async function main(): Promise<void> {
  await runSequelize();
  await runTypeOrm();
  await runMikroOrm();
  await runPrisma();
}

async function runSequelize(): Promise<void> {
  try {
    await MySequelize.connect();

    const transaction = await MySequelize.sequelize.transaction();
    try {
      const user = await MySequelize.UserModel.create(
        {
          name: 'test_user',
          age: 20,
        },
        { transaction },
      );

      await MySequelize.PostModel.create(
        {
          title: 'test_title1',
          content: 'test_content1',
          userId: user.toJSON().id,
        },
        { transaction },
      );

      await MySequelize.PostModel.create(
        {
          title: 'test_title2',
          content: 'test_content2',
          userId: user.toJSON().id,
        },
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      console.error(error);
      transaction.rollback();
    }

    const users = await MySequelize.UserModel.findAll({
      include: [MySequelize.UserToPosts],
    });
    users.forEach((user) => {
      console.log(user.toJSON().id);
      console.log(JSON.stringify(user.toJSON(), null, '\t'));
    });
  } finally {
    await MySequelize.disconnect();
  }
}

async function runTypeOrm(): Promise<void> {
  try {
    await MyTypeOrm.connect();
    const queryRunner = MyTypeOrm.dataSource.createQueryRunner();
    await queryRunner.connect();

    try {
      await queryRunner.startTransaction();

      //EntityManager
      const userInsertResult = await queryRunner.manager.insert(
        MyTypeOrm.User,
        {
          name: 'typeorm_name_1',
          age: 10,
        },
      );
      const userId = userInsertResult.raw;

      //Repository & API
      queryRunner.manager.getRepository(MyTypeOrm.Post).insert({
        title: 'typeorm_title_1',
        content: 'typeorm_content_1',
        user: {
          id: userId,
        },
      });

      //Repository & QueryBuilder
      const postRepository = queryRunner.manager.getRepository(MyTypeOrm.Post);
      await postRepository
        .createQueryBuilder()
        .insert()
        .values({
          title: 'typeorm_title_2',
          content: 'typeorm_content_2',
          user: {
            id: userId,
          },
        })
        .execute();

      const postWithUsers1 = await postRepository.find({
        select: {
          id: true,
          title: true,
          userId: true,
          user: {
            id: true,
            name: true,
          },
        },
        relations: {
          user: true,
        },
      });

      console.log(postWithUsers1);

      const postWithUsers2 = await postRepository
        .createQueryBuilder('p')
        .select()
        .innerJoinAndSelect(MyTypeOrm.User, 'u')
        .getMany();

      console.log(postWithUsers2);

      await queryRunner.commitTransaction();
    } catch (error) {
      console.error(error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  } finally {
    await MyTypeOrm.disconnect();
  }
}

async function runMikroOrm(): Promise<void> {
  const mikroOrm = await MyMikroOrm.connect();
  const em = mikroOrm.em.fork();

  const user = em.create(MyMikroOrm.UserEntity, {
    name: 'mikro-orm-test-1',
    age: 10,
  });
  em.persist(user);

  const post1 = em.create(MyMikroOrm.PostEntity, {
    title: 'mikro-orm-title-1',
    content: 'mikro-orm-content-1',
    user,
  });
  em.persist(post1);

  const post2 = em.create(MyMikroOrm.PostEntity, {
    title: 'mikro-orm-title-2',
    content: 'mikro-orm-content-2',
    user,
  });
  em.persist(post2);

  await em.flush();

  const users1 = await em.findAll(MyMikroOrm.UserEntity, {
    populate: ['posts'],
    strategy: 'select-in',
  });
  users1.forEach((user) => {
    console.log({ ...user });
  });

  const users2 = await em.findAll(MyMikroOrm.UserEntity, {
    populate: ['posts'],
    strategy: 'joined',
  });
  users2.forEach((user) => {
    console.log({ ...user });
  });

  const posts1 = await em.findAll(MyMikroOrm.PostEntity);
  posts1.forEach((post) => {
    console.log({ ...post });
  });

  const posts2 = await em.findAll(MyMikroOrm.PostEntity, {
    populate: ['*'],
  });
  posts2.forEach((post) => {
    console.log({ ...post });
  });

  await mikroOrm.close();
}

async function runPrisma(): Promise<void> {
  const prismaClient = new TypedPrismaClient({});

  await prismaClient.$connect();

  const users = await prismaClient.$transaction(async (transaction) => {
    const user = await transaction.user.create({
      data: {
        age: 1,
        name: 'PRISMA NAME',
      },
    });

    await transaction.post.createMany({
      data: [
        {
          title: 'PRISMA POST TITLE 1',
          content: 'PRISMA POST CONTENT 1',
          userId: user.id,
        },
        {
          title: 'PRISMA POST TITLE 2',
          content: 'PRISMA POST CONTENT 2',
          userId: user.id,
        },
      ],
    });

    const users = await transaction.user.findMany({
      select: {
        id: true,
        age: true,
        createdAt: true,
        Post: {
          select: {
            id: true,
            title: true,
            content: true,
          },
        },
      },
      where: {
        id: user.id,
      },
    });

    return users;
  });

  users.forEach((user) => console.log(JSON.stringify(user, null, 2)));

  await prismaClient.$disconnect();
}
