import Joi from "joi";

export function likesValidation(data){
    const likesSchema = Joi.object({
        userID: Joi.number().positive().required(),
        educationalCentreID: Joi.number().positive().required(),
    })
    return likesSchema.validate(data, {abortEarly: true});
}

export function likesUpdateValidation(data){
    const likesSchema = Joi.object({
        userID: Joi.number().positive(),
        educationalCentreID: Joi.number().positive(),
    })
    return likesSchema.validate(data, {abortEarly: true});
}
