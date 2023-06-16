import { DataTypes } from "sequelize";
import sequelize from ".";
import Product from "./Product.model";

const ProductImage = sequelize.define(
  "ProductImage",
  {
    product_id: {
      type: DataTypes.INTEGER,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "product_image",
    timestamps: false,
  }
);

export default ProductImage;
