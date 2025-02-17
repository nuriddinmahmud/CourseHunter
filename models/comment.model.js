import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import EducationalCentre from '../models/educationalCenter.model.js';
import User from "./users.model.js";

const Comment = sequelize.define("Comment", {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    star: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    educationalCentreID: {
        type: DataTypes.INTEGER,
        references: {
            model: EducationalCentre,
            key: 'id',
        },
        allowNull: false,
    },

    userID: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
});

Comment.hasMany(EducationalCentre, {foreignKey: 'educationalCentreID'});
EducationalCentre.belongsTo(Comment, {foreignKey: 'educationalCentreID'});

Comment.hasMany(User, {foreignKey: 'userID'});
User.belongsTo(Comment, {foreignKey: 'userID'});

export default Comment;