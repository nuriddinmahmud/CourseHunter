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
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  role: {
    type: DataTypes.ENUM("admin", "user", "ceo"),
    defaultValue: "user",
    allowNull: false,
  },

  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: true,
    defaultValue: "inactive",
  },
});

export default Users;
