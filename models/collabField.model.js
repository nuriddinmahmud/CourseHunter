import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Field from "../models/field.model.js";
import EducationalCentre from "../models/educationalCenter.model.js";

const CollabField = sequelize.define("CollabField", {
    fieldID: {
        type: DataTypes.INTEGER,
        references: {
            model: Field,
            key: "id",
        },
        allowNull: false,
    },

    educationalCentreID: {
        type: DataTypes.INTEGER,
        references: {
            model: EducationalCentre,
            key: "id",
        },
        allowNull: false,
    },
});

CollabField.hasMany(Field, { foreignKey: "fieldID" });
Field.belongsTo(CollabField, { foreignKey: "fieldID" });

CollabField.hasMany(EducationalCentre, { foreignKey: "educationalCentreID" });
EducationalCentre.belongsTo(CollabField, { foreignKey: "educationalCentreID" });

export default CollabField;