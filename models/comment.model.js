import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import EducationalCentre from "../models/educationalCenter.model.js";
import Users from "./users.model.js";

const Comment = sequelize.define("Comments", {
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  star: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  educationalCentreID: {
    type: DataTypes.INTEGER,
    references: {
      model: EducationalCentre,
      key: "id",
    },
    allowNull: false,
  },

  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
    allowNull: true,
  },
});

export default Comment;
