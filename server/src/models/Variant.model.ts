import { DataTypes } from "sequelize";
import sequelize from '.';
import Color from "./Color.model";
import Size from "./Size.model";

const Variant = sequelize.define('variant', {
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
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field:'is_deleted'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'variant',
  timestamps: false
});

Variant.belongsTo(Color, { foreignKey: 'colorId' });
Variant.belongsTo(Size, { foreignKey: 'sizeId' });

export default Variant