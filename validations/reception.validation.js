import Joi from "joi";

function receptionValidation(data) {
  const receptionSchema = Joi.object({
    userID: Joi.number().positive().required(),
    fieldID: Joi.number().positive().required(),
    branchID: Joi.number().positive().required(),
  });
  return receptionSchema.validate(data);
}

function receptionValidationUpdate(data) {
  const receptionSchema = Joi.object({
    userID: Joi.number().positive(),
    fieldID: Joi.number().positive(),
    branchID: Joi.number().positive(),
  });
  return receptionSchema.validate(data);
}

export { receptionValidation, receptionValidationUpdate };
