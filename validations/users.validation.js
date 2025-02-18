import Joi from "joi";

export function usersValidation(data) {
  const usersSchema = Joi.object({
    firstName: Joi.string().max(25).min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    avatar: Joi.string().required()
  });
  return usersSchema.validate(data, {abortEarly: true});
}

export function usersValidationUpdate(data) {
  const usersSchema = Joi.object({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string(),
    phone: Joi.string(),
    password: Joi.string(), 
    role: Joi.string(),
    avatar: Joi.string()
  });
  return usersSchema.validate(data, {abortEarly: true});
}