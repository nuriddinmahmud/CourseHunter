import { DataTypes } from "sequelize";
import Branch from "./branches.model.js";
import sequelize from "../config/database.js";
import Region from "./regions.model.js";
import Users from "./users.model.js";

const EducationalCentre = sequelize.define("EducationalCentre", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
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

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {timestamps: true});

export default EducationalCentre;
