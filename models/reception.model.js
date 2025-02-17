import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Branch from "../models/branches.model.js";
import Field from "../models/field.model.js";
import User from "./users.model.js";

const Reception = sequelize.define("Reception", {
  fieldID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Field,
      key: "id",
    },
  },

  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },

  branchID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Branch,
      key: "id",
    },
  },
});


Field.hasMany(Reception, {foreignKey: "fieldID"});
Reception.belongsTo(Field, {foreignKey: "fieldID"});

User.hasMany(Reception, {foreignKey: "userID"});
Reception.belongsTo(User, {foreignKey: "userID"});

Branch.hasOne(Reception, {foreignKey: "branchID"});
Reception.belongsTo(Branch, {foreignKey: "branchID"});

export default Reception;