import { DataTypes } from "sequelize";
import sequelize from '.'
import Rate from "./Rate.model";

const RateImage = sequelize.define('RateImage', {
  rate_id: {
    type: DataTypes.INTEGER
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'rate_image',
  timestamps: false
});

RateImage.belongsTo(Rate, { foreignKey: 'rate_id' });

export default RateImage
