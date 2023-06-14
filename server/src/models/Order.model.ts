import { DataTypes } from "sequelize";
import sequelize from '.'
import User from "./User.model";

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id'
  },
  employeeId: {
    type: DataTypes.INTEGER,
    field: 'employee_id'
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: '1'
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
  total: {
    type: DataTypes.DOUBLE,
    allowNull: false
  }
}, {
  tableName: 'order',
  timestamps: false
});

Order.belongsTo(User, { foreignKey: 'userId' });

export default Order