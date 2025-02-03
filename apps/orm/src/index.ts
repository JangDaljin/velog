import { connect, disconnect, sequelize } from './sequlize';
import { PostModel, UserModel, UserToPosts } from './sequlize/models';

async function main(): Promise<void> {
  try {
    await connect();

    const transaction = await sequelize.transaction();
    try {
      const user = await UserModel.create(
        {
          name: 'test_user',
          age: 20,
        },
        { transaction },
      );

      await PostModel.create(
        {
          title: 'test_title1',
          content: 'test_content1',
          userId: user.toJSON().id,
        },
        { transaction },
      );

      await PostModel.create(
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

    const users = await UserModel.findAll({
      include: [UserToPosts],
    });
    users.forEach((user) => {
      console.log(user.toJSON().id);
      console.log(JSON.stringify(user.toJSON(), null, '\t'));
    });
  } finally {
    await disconnect();
  }
}
main();
