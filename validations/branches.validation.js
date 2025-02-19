import Joi from "joi";

function branchesValidation(data) {
  const branchesSchema = Joi.object({
    name: Joi.string().min(2).required(),
    image: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    regionID: Joi.number().positive().required(),
  });
  return branchesSchema.validate(data, {abortEarly: true});
}

function branchesValidationUpdate(data) {
  const branchesSchema = Joi.object({
    name: Joi.string().min(2),
    image: Joi.string(),
    phone: Joi.string(),
    address: Joi.string(),
    regionID: Joi.number().positive(),
  });
  return branchesSchema.validate(data, {abortEarly: true});
}

export { branchesValidation, branchesValidationUpdate };
