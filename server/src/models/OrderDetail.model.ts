import { DataTypes } from "sequelize";
import sequelize from '.'
import Order from "./Order.model";


const OrderDetail = sequelize.define('OrderDetail', {
  orderId: {
    type: DataTypes.INTEGER,
    field: 'order_id'
  },
  skuId: {
    type: DataTypes.INTEGER,
    field: 'sku_id'
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'order_detail',
  timestamps: false
});

OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });
export default OrderDetail
