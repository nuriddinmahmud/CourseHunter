import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./users.model.js";
import Region from "../models/regions.model.js";

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
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
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
});

EducationalCentre.belongsTo(User, { foreignKey: "userID" });
User.hasMany(EducationalCentre, { foreignKey: "userID" });

EducationalCentre.hasOne(Region, { foreignKey: "regionID" });
Region.belongsTo(EducationalCentre, { foreignKey: "regionID" });

export default EducationalCentre;
