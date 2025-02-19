import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Region from "../models/regions.model.js";
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
});

//CEO
EducationalCentre.belongsTo(Users, { foreignKey: "userID" });
Users.hasMany(EducationalCentre, { foreignKey: "userID" });

EducationalCentre.belongsTo(Region, { foreignKey: "regionID" });
Region.hasMany(EducationalCentre, { foreignKey: "regionID" });

export default EducationalCentre;
