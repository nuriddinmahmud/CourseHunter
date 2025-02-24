import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import ResourceCategory from "./resourceCategory.model.js";
import Users from "./users.model.js";

const Resource = sequelize.define("Resource", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  media: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  createdBy: {
    type: DataTypes.INTEGER,
    references: { model: Users, key: "id" },
    allowNull: true,
  },

  categoryID: {
    type: DataTypes.INTEGER,
    references: { model: ResourceCategory, key: "id" },
    allowNull: false,
  },
});

export default Resource;
