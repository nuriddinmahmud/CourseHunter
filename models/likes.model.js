import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import EducationalCentre from "../models/educationalCenter.model.js";
import Users from "./users.model.js";

const Likes = sequelize.define("Likes", {
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: Users,
      key: "id",
    },
    allowNull: false,
  },

  educationalCentreID: {
    type: DataTypes.INTEGER,
    references: {
      model: EducationalCentre,
      key: "id",
    },
    allowNull: false,
  },
});

Likes.hasMany(Users, { foreignKey: "userID" });
Users.belongsTo(Likes, { foreignKey: "userID" });

Likes.hasMany(EducationalCentre, { foreignKey: "educationalCentreID" });
EducationalCentre.belongsTo(Likes, { foreignKey: "educationalCentreID" });

export default Likes;
