import Joi from "joi";

function resourceValidation(data) {
  const resourceSchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().required(),
    media: Joi.string().required(),
    createdAt: Joi.date(),
    creatBy: Joi.number().positive().required(),
    categoryID: Joi.number().positive().required(),
  });
  return resourceSchema.validate(data, {abortEarly: true});
}

function resourceValidationUpdate(data) {
  const resourceSchema = Joi.object({
    name: Joi.string().min(2),
    description: Joi.string().min(2),
    image: Joi.string(),
    media: Joi.string(),
    createdAt: Joi.date(),
    creatBy: Joi.number().positive(),
    categoryID: Joi.number(),
  });
  return resourceSchema.validate(data, {abortEarly: true});
}

export { resourceValidation, resourceValidationUpdate };
