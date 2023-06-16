import { DataTypes } from "sequelize";
import sequelize from ".";
import RateImage from "./RateImage.model";
import User from "./User.model";

const Rate = sequelize.define(
  "Rate",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      field:'product_id'
    },
    userId: {
      type: DataTypes.INTEGER,
      field:'user_id'
    },
    star: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "rate",
    timestamps: false,
  }
);

Rate.belongsTo(User, { foreignKey: "userId" });
Rate.hasMany(RateImage, { foreignKey: "rateId" });
RateImage.belongsTo(Rate, { foreignKey: "rateId" });

export default Rate;
