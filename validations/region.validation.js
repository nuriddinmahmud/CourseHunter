import Joi from "joi";

export function regionValidation(data){
    const regionSchema = Joi.object({
        name: Joi.string().min(2).required(),
    })
    return regionSchema.validate(data)
}