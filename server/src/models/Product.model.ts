import { DataTypes } from "sequelize";
import sequelize from ".";
import User from "./User.model";
import Category from "./Category.model";
import RateImage from "./RateImage.model";
import ProductImage from "./ProductImage.model";
import Variant from "./Variant.model";
import Rate from "./Rate.model";

const Product = sequelize.define(
  "Product",
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
    searchInfo: { type: DataTypes.TEXT, field: "search_info" },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    categoryId: {
      type: DataTypes.INTEGER,
      field: "category_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_deleted",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

Product.belongsTo(User, { foreignKey: "userId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });
Product.hasMany(Rate, { foreignKey: "productId" });
Product.hasMany(ProductImage, { foreignKey: "productId" });
ProductImage.belongsTo(Product, { foreignKey: "productId" });

Product.hasMany(Variant, { foreignKey: "productId" });
Variant.belongsTo(Product, { foreignKey: "productId" });

export default Product;
