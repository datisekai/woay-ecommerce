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
    productId: {
      type: DataTypes.INTEGER,
      field: "product_id",
    },
    size: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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

Size.belongsTo(Product, { foreignKey: "productId" });

export default Size;
