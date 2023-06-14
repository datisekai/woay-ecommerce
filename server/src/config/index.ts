import dotenv from "dotenv";

dotenv.config();

const config = {
  jwt: process.env.JWT_SECRET || "datisekai",
  dbName: process.env.DB_NAME || "",
  dbUsername: process.env.DB_USERNAME || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbHost: process.env.DB_HOST,
};

export default config;
