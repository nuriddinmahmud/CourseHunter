import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "mysql",
  username: "root",
  password: process.env.PASSWORD,
  database: "course_hunter",
  logging: false,
  timezone: "+06:00"
});

export default sequelize;
