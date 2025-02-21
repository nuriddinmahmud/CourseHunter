import Joi from "joi";

function regionValidation(data){
    const regionSchema = Joi.object({
        name: Joi.string().min(2).required(),
    })
    return regionSchema.validate(data, {abortEarly: true});
}

function regionUpdateValidation(data) {
    const regionSchema = Joi.object({
        name: Joi.string().min(2).optional(),
    })
    return regionSchema.validate(data, {abortEarly: true});
}

export {regionUpdateValidation, regionValidation}
