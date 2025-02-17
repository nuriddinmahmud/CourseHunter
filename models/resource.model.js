import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./users.model.js";
import ResourceCategory from "./resourceCategory.model.js";

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
    references: { model: User, key: "id" },
    type: DataTypes.STRING,
    allowNull: false,
  },

  categoryID: {
    references: { model: ResourceCategory, key: "id" },
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Resource.hasMany(User, { foreignKey: "createdBy" });
User.belongsTo(Resource, { foreignKey: "createdBy" });

ResourceCategory.hasMany(Resource, { foreignKey: "categoryID" });
Resource.belongsTo(ResourceCategory, { foreignKey: "categoryID" });

export default Resource;
