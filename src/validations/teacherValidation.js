import Joi from 'joi';

const validateUpdateTeacher = (data) => {
    const schema = Joi.object({
        teacher_id: Joi.string().min(5).max(10),  
        name: Joi.string().required(),  
        specialization: Joi.string().required(),  
        phone: Joi.string().min(10).max(15).required(),  
        email: Joi.string().email().required(), 
    });

    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);
};

const validateCreateTeacher = (teacher) => {
    const schema = Joi.object({
        teacher_id: Joi.string().min(5).max(10).required(),  
        name: Joi.string().required(),  
        specialization: Joi.string().required(),  
        phone: Joi.string().min(10).max(15).required(),  
        email: Joi.string().email().required(),  
    });

    return schema.validate(teacher);
};

export const teacherValidation = {
    validateUpdateTeacher,
    validateCreateTeacher,
};
