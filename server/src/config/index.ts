import dotenv from "dotenv";

dotenv.config();

const config = {
  jwt: process.env.JWT_SECRET || "datisekai",
  dbName: process.env.DB_NAME || "",
  dbUsername: process.env.DB_USERNAME || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbHost: process.env.DB_HOST,
  emailUser:process.env.EMAIL_USER,
  emailPassword:process.env.EMAIL_PASSWORD,
  feUrl: process.env.FE_URL,
  firebaseKey:process.env.FIREBASE_API_KEY
};

export default config;
