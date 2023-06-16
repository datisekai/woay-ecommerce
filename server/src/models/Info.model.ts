import { DataTypes } from "sequelize";
import sequelize from '.'
import User from "./User.model";

const Info = sequelize.define('Info', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id'
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isDefault: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field:"is_default"
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'user_info',
  timestamps: false
});

Info.belongsTo(User, { foreignKey: 'userId' });

export default Info
