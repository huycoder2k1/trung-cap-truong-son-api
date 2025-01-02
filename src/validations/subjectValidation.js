import Joi from "joi";

const validateUpdateSubject = (data) => {
    const schema = Joi.object({
        subject_id: Joi.string().min(5).max(10).required(),  
        name: Joi.string().min(3).required(),  
        credits: Joi.number().min(1).max(10).required(),  
    });

    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);  
};

const validateCreateSubject = (subject) => {
    const schema = Joi.object({
        subject_id: Joi.string().min(5).max(10).required(),  
        name: Joi.string().min(3).required(),  
        credits: Joi.number().min(1).max(10).required(),  
    });

    return schema.validate(subject);  
}

export const subjectValidation = {
    validateUpdateSubject,
    validateCreateSubject
};
