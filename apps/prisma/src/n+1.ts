import { randomUUID } from 'crypto';
import { TypedPrismaClient } from './typed-prisma-client';
const prismaClient = new TypedPrismaClient({
  onQuery: (event) => console.log(event),
});

async function createData() {
  const uids = Array.from({ length: 10 }, () => randomUUID());

  //User 생성
  await prismaClient.user.createMany({
    data: uids.map((uid, i) => ({
      uid,
      name: `name_${i + 1}`,
      age: i,
    })),
  });

  const users = await prismaClient.user.findMany({
    where: { uid: { in: uids } },
  });

  //Post 생성
  await prismaClient.post.createMany({
    data: users
      .map((user) =>
        Array.from({ length: 10 }, (_, i) => ({
          userId: user.id,
          title: `${user.id} - title ${i + 1}`,
          content: `${user.id} - content ${i + 1}`,
        })),
      )
      .flatMap((data) => data),
  });
}

async function find() {
  await prismaClient.user.findMany({
    include: {
      Post: true,
    },
  });

  await prismaClient.post.findMany({
    include: { user: true },
  });
}

export async function nPlus1() {
  await prismaClient.$connect();

  await createData();
  await find();

  await prismaClient.$disconnect();
}
