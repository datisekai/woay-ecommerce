import { DataTypes } from "sequelize";
import sequelize from ".";
import User from "./User.model";
import Info from "./Info.model";
import OrderDetail from "./OrderDetail.model";

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    infoId: {
      type: DataTypes.INTEGER,
      fields: "info_id",
    },

    employeeId: {
      type: DataTypes.INTEGER,
      field: "employee_id",
    },
    status: {
      type: DataTypes.ENUM("1", "2", "0"),
      defaultValue: "1",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    tableName: "order",
    timestamps: false,
  }
);

Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Info, {foreignKey:'infoId'})
Order.hasMany(OrderDetail,{foreignKey:'orderId'})
OrderDetail.belongsTo(Order,{foreignKey:'orderId'})

export default Order;
