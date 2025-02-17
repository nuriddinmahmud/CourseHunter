import Joi from "joi";

function usersValidation(data) {
  const usersSchema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    avatar: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });
  return usersSchema.validate(data);
}

function usersValidationUpdate(data) {
  const usersSchema = Joi.object({
    firstname: Joi.string().min(2),
    lastname: Joi.string().min(2),
    avatar: Joi.string(),
    email: Joi.string(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string(),
  });
  return usersSchema.validate(data);
}

export { usersValidation, usersValidationUpdate };
