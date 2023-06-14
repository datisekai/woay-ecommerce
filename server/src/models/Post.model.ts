import { DataTypes } from "sequelize";
import sequelize from '.'
import User from "./User.model";
import Blog from "./Blog.model";

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slug:{
        type:DataTypes.STRING,
        unique:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    blogId: {
      type: DataTypes.INTEGER,
      field: "blog_id",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "post",
    timestamps: false,
  }
);

Post.belongsTo(User, { foreignKey: "userId" });
Post.belongsTo(Blog, { foreignKey: "blogId" });

export default Post