import { DataTypes } from "sequelize";
import sequelize from '.'
import Product from "./Product.model";
import Color from "./Color.model";
import Size from "./Size.model";

const Sku = sequelize.define('Sku', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  colorId: {
    type: DataTypes.INTEGER,
    field: 'color_id'
  },
  thumbnail:{
    type:DataTypes.STRING,
  },
  sizeId: {
    type: DataTypes.INTEGER,
    field: 'size_id'
  },
  productId: {
    type: DataTypes.INTEGER,
    field: 'product_id'
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.DOUBLE
  },
  discount: {
    type: DataTypes.INTEGER
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
  tableName: 'sku',
  timestamps: false
});

Sku.belongsTo(Product, { foreignKey: 'productId' });
Sku.belongsTo(Color, { foreignKey: 'colorId' });
Sku.belongsTo(Size, { foreignKey: 'sizeId' });


export default Sku