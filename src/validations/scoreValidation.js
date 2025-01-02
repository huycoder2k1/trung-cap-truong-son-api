import Joi from "joi";

const validateUpdateScore = (data) => {
    const schema = Joi.object({
        student_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),  
        subject_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),  
        scores: Joi.array().items(
            Joi.object({
                type: Joi.string().valid('midterm', 'final', 'assignment').required(), 
                value: Joi.number().min(0).max(10).required()  
            })
        ).required(),
    });

    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);
};

const validateCreateScore = (score) => {
    const schema = Joi.object({
        student_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),  
        subject_id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(), 
        scores: Joi.array().items(
            Joi.object({
                type: Joi.string().valid('midterm', 'final', 'assignment').required(), 
                value: Joi.number().min(0).max(10).required()  
            })
        ).required(),
    });

    return schema.validate(score);
};

export const scoreValidation = {
    validateUpdateScore,
    validateCreateScore
};
