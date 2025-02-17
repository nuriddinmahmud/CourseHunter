import Joi from "joi";

function collabFieldValidation(data) {
  const collabFieldSchema = Joi.object({
    fieldID: Joi.number().positive().required(),
    educationalCenterID: Joi.number().positive().required(),
  });
  return collabFieldSchema.validate(data);
}

function collabFieldValidationUpdate(data) {
  const collabFieldSchema = Joi.object({
    fieldID: Joi.number().positive(),
    educationalCenterID: Joi.number().positive(),
  });
  return collabFieldSchema.validate(data);
}

export { collabFieldValidation, collabFieldValidationUpdate };
