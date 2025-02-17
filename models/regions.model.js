import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Region = sequelize.define("Region", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Region;
