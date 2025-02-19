import Joi from "joi";

function coursesValidation(data) {
  const coursesSchema = Joi.object({
    name: Joi.string().min(2).required(),
    image: Joi.string().required(),
    type: Joi.string().required(),
  });
  return coursesSchema.validate(data, {abortEarly: true});
}

function coursesValidationUpdate(data) {
  const coursesSchema = Joi.object({
    name: Joi.string().min(2),
    image: Joi.string(),
    type: Joi.string(),
  });
  return coursesSchema.validate(data, {abortEarly: true});
}

export { coursesValidation, coursesValidationUpdate };
