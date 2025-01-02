import Joi from "joi";

const validateUpdateStudent = (data) => {
    const schema = Joi.object({
        student_id: Joi.string().length(8).required(),  
        name: Joi.string().min(3).max(100).required(),  
        dob: Joi.date().required(),  
        address: Joi.string().min(5).max(255).required(),  
        phone: Joi.string().min(10).max(15).required(),  
        email: Joi.string().email().required(), 
        class_id: Joi.string().required(), 
        status: Joi.string().valid('active', 'inactive').required()  
    });

    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);
}

const validateCreateStudent = (student) => {
    const schema = Joi.object({
        student_id: Joi.string().length(8).required(),  
        name: Joi.string().min(3).max(100).required(),  
        dob: Joi.date().required(),  
        address: Joi.string().min(5).max(255).required(),  
        phone: Joi.string().min(10).max(15).required(),  
        email: Joi.string().email().required(),  
        class_id: Joi.string().required(),  
        status: Joi.string().valid('active', 'inactive').required()  
    });

    return schema.validate(student);
}

export const studentValidation = {
    validateUpdateStudent,
    validateCreateStudent
};
