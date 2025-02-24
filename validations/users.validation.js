import Joi from "joi";

function usersValidation(data) {
  const Users = Joi.object({
    firstName: Joi.string().max(25).min(2).pattern(/^[a-zA-Z]+$/).required(),
    lastName: Joi.string().max(25).min(2).pattern(/^[a-zA-Z]+$/).required(),
    email: Joi.string().email({tlds: {allow: ["com", "net", "uz", "ru", "en"]}}).required(),
    phone: Joi.string().min(13).max(13).pattern(/^\+998\d{9}$/).required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: Joi.string().valid("Admin", "Ceo", "User").required(),
    avatar: Joi.string().required(),
    status: Joi.string().valid("Active", "Inactive").optional(),
  });
  return Users.validate(data, {abortEarly: true});
}

function usersValidationUpdate(data) {
  const Users = Joi.object({
    firstName: Joi.string().min(2).max(25).pattern(/^[a-zA-Z]+$/).optional(),
    lastName: Joi.string().min(2).max(50).pattern(/^[a-zA-Z]+$/).optional(),
    email: Joi.string().email({tlds: {allow: ["com", "net", "uz", "ru", "en"]}}).optional(),
    phone: Joi.string().max(13).min(13).pattern(/^\+998\d{9}$/).optional(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3, 30}$')).optional(),
    role: Joi.string().valid("Admin", "Ceo", "User").optional(),
    avatar: Joi.string().optional(),
    status: Joi.string().valid("Active", "Inactive").optional(),
  });
  return Users.validate(data, {abortEarly: true});
}

export {usersValidation, usersValidationUpdate}
