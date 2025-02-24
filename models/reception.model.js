import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Branch from "../models/branches.model.js";
import Field from "../models/field.model.js";
import Users from "./users.model.js";
import EducationalCentre from "./educationalCenter.model.js";

const Reception = sequelize.define("Reception", {
  fieldID: {
    type: DataTypes.INTEGER,
    references: {
      model: Field,
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

  branchID: {
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
      key: "id",
    },
    allowNull: false,
  },

  educationalCentreID: {
    type: DataTypes.INTEGER,
    references: {
      model: EducationalCentre,
      key: 'id',
    },
    allowNull: false,
  }
});

export default Reception;
