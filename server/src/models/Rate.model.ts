import { DataTypes } from "sequelize";
import sequelize from '.'
import RateImage from "./RateImage.model";

const Rate = sequelize.define('Rate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: {
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  star: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'rate',
  timestamps: false
});

// Rate.hasMany(RateImage, { foreignKey: 'rate_id' });

export default Rate;
