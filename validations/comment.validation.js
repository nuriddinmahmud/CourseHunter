import Joi from "joi";

function commentValidation(data){
    const commentSchema = Joi.object({
        description: Joi.string().min(2).required(),
        star: Joi.number().required(),
        createdAt: Joi.date(),
        educationalCentreID: Joi.number().positive().required(),
        userID: Joi.number().positive().required(),
    });
    return commentSchema.validate(data, {abortEarly: true});
}

function commentValidationUpdate(data){
    const commentSchema = Joi.object({
        description: Joi.string().min(2),
        star: Joi.number().positive(),
        createdAt: Joi.date(),
        educationalCentreID: Joi.number().positive(),
        userID: Joi.number().positive(),
    });
    return commentSchema.validate(data, {abortEarly: true});
}

export {commentValidation, commentValidationUpdate}
