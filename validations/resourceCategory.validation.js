import Joi from "joi";

function resourceCategoryValidation(data) {
  const resourceSchema = Joi.object({
    name: Joi.string().min(2).required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().required(),
    image: Joi.string().required(),
    media: Joi.string().required(),
    createdAt: Joi.date(),
    creatBy: Joi.number().positive().required(),
    categoryID: Joi.number().positive().required(),
  });
  return resourceSchema.validate(data);
}

function resourceCategoryValidationUpdate(data) {
  const resourceSchema = Joi.object({
    name: Joi.string().min(2),
    description: Joi.string().min(2),
    image: Joi.string(),
    image: Joi.string(),
    media: Joi.string(),
    createdAt: Joi.date(),
    creatBy: Joi.number().positive(),
    categoryID: Joi.number().positive(),
  });
  return resourceSchema.validate(data);
}

export { resourceCategoryValidation, resourceCategoryValidationUpdate };
