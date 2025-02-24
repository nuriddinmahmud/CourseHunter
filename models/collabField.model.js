import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Field from "../models/field.model.js";
import EducationalCentre from "../models/educationalCenter.model.js";

const CollabField = sequelize.define("CollabField", {
  fieldID: {
    type: DataTypes.INTEGER,
    references: {
      model: Field,
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

export default CollabField;