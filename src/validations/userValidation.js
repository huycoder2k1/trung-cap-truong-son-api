import Joi from "joi"

const validateUpdateUser = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50),
        password: Joi.string().min(6),
        role: Joi.string().valid('admin', 'user'),
    });

    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);
}

const validateCreateUser  = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'user').default('user')
    });

    return schema.validate(user);
}

export const userValidation = {
    validateUpdateUser,
    validateCreateUser
}
