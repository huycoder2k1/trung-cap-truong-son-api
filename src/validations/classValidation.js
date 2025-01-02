import Joi from 'joi';

const validateUpdateClass = (data) => {
    const schema = Joi.object({
        class_id: Joi.string().alphanum().min(6).max(12).required(), 
        name: Joi.string().min(3).max(100).required(), 
        start_date: Joi.date().iso().required(), 
        end_date: Joi.date().iso().greater(Joi.ref('start_date')).required(), 
        teacher_id: Joi.string().alphanum().min(24).max(24).required(), 
        students: Joi.array().items(Joi.string().alphanum().min(24).max(24)),
    });

    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);
}

const validateCreateClass  = (classes) => {
    const schema = Joi.object({
        class_id: Joi.string().alphanum().min(6).max(12).required(), 
        name: Joi.string().min(3).max(100).required(), 
        start_date: Joi.date().iso().required(), 
        end_date: Joi.date().iso().greater(Joi.ref('start_date')).required(), 
        teacher_id: Joi.string().alphanum().min(24).max(24).required(), 
        students: Joi.array().items(Joi.string().alphanum().min(24).max(24)),
    });

    return schema.validate(classes);
}

export const classValidation = {
    validateUpdateClass,
    validateCreateClass
}
