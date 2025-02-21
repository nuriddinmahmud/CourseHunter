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

Reception.belongsTo(Field, { foreignKey: "fieldID" });
Field.hasMany(Reception, { foreignKey: "fieldID" });

Users.hasMany(Reception, { foreignKey: "userID" });
Reception.belongsTo(Users, { foreignKey: "userID" });

Branch.hasOne(Reception, { foreignKey: "branchID" });
Reception.belongsTo(Branch, { foreignKey: "branchID" });

EducationalCentre.hasMany(Reception, { foreignKey: 'educationalCentreID' });
Reception.belongsTo(EducationalCentre, { foreignKey: 'educationalCentreID' });

export default Reception;
