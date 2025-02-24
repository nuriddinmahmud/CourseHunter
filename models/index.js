import sequelize from "../config/database.js";

// Barcha modellarni import qilamiz
import Users from "./users.model.js";
import Region from "./regions.model.js";
import Branch from "./branches.model.js";
import EducationalCentre from "./educationalCenter.model.js";
import Reception from "./reception.model.js";
import Resource from "./resource.model.js";
import Comment from "./comment.model.js";
import ResourceCategory from "./resourceCategory.model.js";
import Likes from "./likes.model.js";
import CollabField from "./collabField.model.js";
import Course from "./courses.model.js";
import Field from "./field.model.js";

EducationalCentre.belongsTo(Users, { foreignKey: "userID" });
Users.hasMany(EducationalCentre, { foreignKey: "userID" });

EducationalCentre.belongsTo(Region, { foreignKey: "regionID" });
Region.hasMany(EducationalCentre, { foreignKey: "regionID" });

Region.hasMany(Branch, { foreignKey: "regionID" });
Branch.belongsTo(Region, { foreignKey: "regionID" });

EducationalCentre.hasMany(Branch, { foreignKey: "centreID" });
Branch.belongsTo(EducationalCentre, { foreignKey: "centreID" });

Reception.belongsTo(Field, { foreignKey: "fieldID" });
Field.hasMany(Reception, { foreignKey: "fieldID" });

Users.hasMany(Reception, { foreignKey: "userID" });
Reception.belongsTo(Users, { foreignKey: "userID" });

Branch.hasMany(Reception, { foreignKey: "branchID" });
Reception.belongsTo(Branch, { foreignKey: "branchID" });

EducationalCentre.hasMany(Reception, { foreignKey: "educationalCentreID" });
Reception.belongsTo(EducationalCentre, { foreignKey: "educationalCentreID" });

Course.hasMany(Field, { foreignKey: "courseID" });
Field.belongsTo(Course, { foreignKey: "courseID" });

Resource.belongsTo(Users, { foreignKey: "createdBy" });
Users.hasMany(Resource, { foreignKey: "createdBy" });

ResourceCategory.hasMany(Resource, { foreignKey: "categoryID" });
Resource.belongsTo(ResourceCategory, { foreignKey: "categoryID" });

EducationalCentre.hasMany(Comment, { foreignKey: "educationalCentreID" });
Comment.belongsTo(EducationalCentre, { foreignKey: "educationalCentreID" });

Users.hasMany(Comment, { foreignKey: "userID" });
Comment.belongsTo(Users, { foreignKey: "userID" });

CollabField.hasMany(Field, { foreignKey: "collabFieldID" });
Field.belongsTo(CollabField, { foreignKey: "collabFieldID" });

CollabField.hasMany(EducationalCentre, { foreignKey: "educationalCentreID" });
EducationalCentre.belongsTo(CollabField, { foreignKey: "educationalCentreID" });

export { 
  sequelize, 
  Users, 
  Region, 
  Branch, 
  EducationalCentre, 
  Reception, 
  Resource, 
  Comment, 
  ResourceCategory, 
  Likes, 
  CollabField, 
  Course, 
  Field 
};