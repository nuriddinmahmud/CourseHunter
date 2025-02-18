import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./users.model.js";
import ResourceCategory from "./resourceCategory.model.js";

const Resource = sequelize.define("Resource", {
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
  },

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
    references: { model: User, key: "id" },
    allowNull: false,
  },
  
  categoryID: {
    type: DataTypes.INTEGER,
    references: { model: ResourceCategory, key: "id" },
    allowNull: false,
  },
});

Resource.hasMany(User, { foreignKey: "createdBy" });
User.belongsTo(Resource, { foreignKey: "createdBy" });

ResourceCategory.hasMany(Resource, { foreignKey: "categoryID" });
Resource.belongsTo(ResourceCategory, { foreignKey: "categoryID" });

export default Resource;
