import Joi from "joi";

function educationCenterValidation(data) {
  const educationCenterSchema = Joi.object({
    name: Joi.string().min(2).required(),
    image: Joi.string().required(),
    address: Joi.string().required(),
    userID: Joi.number().positive().required(),
    regionID: Joi.number().positive().required(),
    phone: Joi.string().min(13).required(),
  });
  return educationCenterSchema.validate(data, {abortEarly: true});
}

function educationalCenterValidationUpdate(data) {
  const educationCenterSchema = Joi.object({
    name: Joi.string().min(2),
    image: Joi.string(),
    address: Joi.string(),
    userId: Joi.number().positive(),
    regionID: Joi.number().positive(),
    phone: Joi.string().min(13),
  });
  return educationCenterSchema.validate(data, {abortEarly: true});
}

export { educationCenterValidation, educationalCenterValidationUpdate };
