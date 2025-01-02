import Joi from "joi";

const validateCreateEthic = (data) => {
    const schema = Joi.object({
        student_id: Joi.string().required(),  
        semester: Joi.string().valid('Học kì 1', 'Học kì 2').required(),  
        year: Joi.string().length(4).pattern(/^\d+$/).required(), 
        ethics_score: Joi.number().min(0).max(10).required()  
    })

    const { error } = schema.validate(data)
    if (error) throw new Error(error.details[0].message)
}

const validateUpdateEthic = (data) => {
    const schema = Joi.object({
        student_id: Joi.string(),  
        semester: Joi.string().valid('Học kì 1', 'Học kì 2'),  
        year: Joi.string().length(4).pattern(/^\d+$/),  
        ethics_score: Joi.number().min(0).max(10)
    })

    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);  
}

export const ethicValidation = {
    validateCreateEthic,
    validateUpdateEthic
}
