import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ResourceCategory = sequelize.define("ResourceCategory", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default ResourceCategory;
