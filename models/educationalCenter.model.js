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
    references: {
      model: User,
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
});

EducationalCentre.hasMany(User, { foreignKey: "userID" });
User.belongsTo(EducationalCentre, { foreignKey: "userID" });

EducationalCentre.hasOne(Region, { foreignKey: "regionID" });
Region.belongsTo(EducationalCentre, { foreignKey: "regionID" });

export default EducationalCentre;
