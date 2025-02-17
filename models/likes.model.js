import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./users.model.js";
import EducationalCentre from "../models/educationalCenter.model.js";

const Likes = sequelize.define("Likes", {
  userID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
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

Likes.hasMany(User, { foreignKey: "userID" });
User.belongsTo(Likes, { foreignKey: "userID" });

Likes.hasMany(EducationalCentre, { foreignKey: "educationalCentreID" });
EducationalCentre.belongsTo(Likes, { foreignKey: "educationalCentreID" });

export default Likes;
