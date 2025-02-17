import Joi from "joi";

function fieldValidation(data) {
  const fieldSchema = Joi.object({
    name: Joi.string().min(2).required(),
    image: Joi.string().required(),
    courseID: Joi.number().positive(),
  });
  return fieldSchema.validate(data);
}

function fieldValidationUpdate(data) {
  const fieldSchema = Joi.object({
    name: Joi.string().min(2),
    image: Joi.string(),
    courseID: Joi.number().positive(),
  });
  return fieldSchema.validate(data);
}

export { fieldValidation, fieldValidationUpdate };
