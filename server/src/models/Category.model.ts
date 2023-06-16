import { DataTypes } from "sequelize";
import sequelize from ".";
import User from "./User.model";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "category",
    timestamps: false,
  }
);

Category.belongsTo(User, { foreignKey: "userId" });

export default Category;
