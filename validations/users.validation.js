import Joi from "joi";

export function usersValidation(data) {
  const Users = Joi.object({
    firstName: Joi.string().required().max(25).min(2),
    lastName: Joi.string().required().max(25).min(2),
    email: Joi.string().required().email(),
    phone: Joi.string().required().min(12),
    password: Joi.string().required(),
    role: Joi.string().required(),
    avatar: Joi.string().required(),
    status: Joi.string().optional(),
  });
  return Users.validate(data, {abortEarly: true});
}

export function usersValidationUpdate(data) {
  const Users = Joi.object({
    firstName: Joi.string().min(2).max(25).optional(),
    lastName: Joi.string().min(2).max(50).optional(),
    email: Joi.string().optional().email(),
    phone: Joi.string().optional().max(13).min(13),
    password: Joi.string().optional(),
    role: Joi.string().optional(),
    avatar: Joi.string().optional(),
    status: Joi.string().optional(),
  });
  return Users.validate(data, {abortEarly: true});
}