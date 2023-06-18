import { DataTypes } from "sequelize";
import sequelize from '.'
import Product from "./Product.model";

const Size = sequelize.define(
  "Size",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field:'is_deleted'
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "size",
    timestamps: false,
  }
);


export default Size;
