import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Users = sequelize.define("Users", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  role: {
    type: DataTypes.ENUM("Admin", "User", "Ceo"),
    allowNull: false,
  },

  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: true,
    defaultValue: "Inactive",
  },
}, {timestamps: true});

export default Users;
