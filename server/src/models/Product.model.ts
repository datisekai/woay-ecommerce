import { DataTypes } from "sequelize";
import sequelize from '.'
import User from "./User.model";
import Category from "./Category.model";
import RateImage from "./RateImage.model";

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slug:{
    type:DataTypes.STRING,
    unique:true
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id'
  },
  categoryId: {
    type: DataTypes.INTEGER,
    field: 'category_id'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'product',
  timestamps: false
});

Product.belongsTo(User, { foreignKey: 'userId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.hasMany(RateImage,{foreignKey:'product_id'})

export default Product;
