import Joi from "joi";

export function likesValidation(data){
    const likesSchema = Joi.object({
        userID: Joi.number().positive().required(),
        educationalCentreID: Joi.number().positive().required(),
    })
    return likesSchema.validate(data)
}
