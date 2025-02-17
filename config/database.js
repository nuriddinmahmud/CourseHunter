import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host: "localhost",
    dialect: "mysql",
    username: "root",
    password: "1234",
    database: "course_hunter",
    logging: false
});


export default sequelize;