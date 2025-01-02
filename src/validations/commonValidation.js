import Joi from "joi"

const validateParamId = (id) => {
    const schema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required();
    const { error } = schema.validate(id);
    if (error) throw new Error('Invalid ID format');
}

export const commonValidation = {
    validateParamId
}
