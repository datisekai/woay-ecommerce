import { Sequelize } from "sequelize";
import config from "../config";
import pg from 'pg'

const sequelize = new Sequelize(
  config.dbName,
  config.dbUsername,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: "postgres",
    dialectModule:pg,
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = import("./User.model");
db.info = import("./Info.model");
db.order = import("./Order.model");
db.orderDetail = import("./OrderDetail.model");
db.blog = import("./Blog.model");
db.post = import("./Post.model");
db.category = import("./Category.model");
db.product = import("./Product.model");
db.sku = import("./SKU.model");
db.color = import("./Color.model");
db.size = import("./Size.model");
db.rate = import("./Rate.model");
db.rateImage = import("./RateImage.model");
db.productImage = import("./ProductImage.model");

db.sequelize.sync({ force: false, logging: false }).then(() => {
  console.log("Đã hoàn tất resync!!");
});

export default db.sequelize;
