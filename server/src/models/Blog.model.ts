import { DataTypes } from "sequelize";
import sequelize from '.'
import User from "./User.model";

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slug:{
        type:DataTypes.STRING,
        unique:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field:"is_deleted"
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "blog",
    timestamps: false,
  }
);

Blog.belongsTo(User, { foreignKey: "userId" });

export default Blog;
