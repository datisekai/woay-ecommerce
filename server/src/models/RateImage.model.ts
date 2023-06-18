import { DataTypes } from "sequelize";
import sequelize from '.'
import Rate from "./Rate.model";

const RateImage = sequelize.define('RateImage', {
  rateId: {
    type: DataTypes.INTEGER,
    field:'rate_id'
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field:'created_at'
  }
}, {
  tableName: 'rate_image',
  timestamps: false
});



export default RateImage
