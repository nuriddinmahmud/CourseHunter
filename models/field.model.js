import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Course from "../models/courses.model.js";

const Field = sequelize.define("Field", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  courseID: {
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: "id",
    },
    allowNull: false,
  },
});

Field.hasMany(Course, { foreignKey: "courseID" });
Course.belongsTo(Field, { foreignKey: "courseID" });

export default Field;
