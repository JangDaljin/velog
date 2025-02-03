import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';

export class PostModel extends Model {}
PostModel.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      comment: 'PK',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '제목',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '',
      comment: '내용',
    },
  },
  {
    sequelize,
  },
);

export class UserModel extends Model {}
UserModel.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      comment: 'PK',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '',
      comment: '이름',
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '나이',
    },
  },
  {
    sequelize,
    indexes: [
      {
        fields: ['age'],
      },
    ],
  },
);

export const PostToUser = PostModel.belongsTo(UserModel, {
  foreignKey: 'userId',
  targetKey: 'id',
  onDelete: 'CASCADE',
});

export const UserToPosts = UserModel.hasMany(PostModel, {
  foreignKey: 'userId',
  sourceKey: 'id',
  onDelete: 'CASCADE',
});
