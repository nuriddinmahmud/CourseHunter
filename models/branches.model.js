import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Region from "./regions.model.js";
import EducationalCentre from "./educationalCenter.model.js";

const Branch = sequelize.define("Branch", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  regionID: {
    type: DataTypes.INTEGER,
    references: {
      model: Region,
      key: "id",
    },
    allowNull: false,
  },

  centreID: {
    type: DataTypes.INTEGER,
    references: {
      model: EducationalCentre,
      key: "id",
    },
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Branch;
