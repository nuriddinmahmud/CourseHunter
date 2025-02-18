import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Branch from "../models/branches.model.js";
import Field from "../models/field.model.js";
import User from "./users.model.js";

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
      model: User,
      key: "id",
    },
    allowNull: false,
  },

  branchID: {
    type: DataTypes.INTEGER,
    references: {
      model: Branch,
      key: "id",
    },
    allowNull: false,
  },
});

Field.hasMany(Reception, { foreignKey: "fieldID" });
Reception.belongsTo(Field, { foreignKey: "fieldID" });

User.hasMany(Reception, { foreignKey: "userID" });
Reception.belongsTo(User, { foreignKey: "userID" });

Branch.hasOne(Reception, { foreignKey: "branchID" });
Reception.belongsTo(Branch, { foreignKey: "branchID" });

export default Reception;
