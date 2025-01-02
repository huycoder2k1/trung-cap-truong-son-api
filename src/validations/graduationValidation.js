import Joi from "joi";

const validateCreateGraduation = (data) => {
  const schema = Joi.object({
    student_id: Joi.string().required(), 
    status: Joi.string()
      .valid("eligible", "not_eligible") 
      .required(),
    rank: Joi.string()
      .valid("excellent", "good", "average", "poor") 
      .required(),
    certificates: Joi.array()
      .items(
        Joi.object({
          type: Joi.string().required(), 
          issued_date: Joi.date().iso().required(), 
        })
      )
      .required(), 
  });

  const { error } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

const validateUpdateGraduation = (data) => {
  const schema = Joi.object({
    student_id: Joi.string(), 
    status: Joi.string().valid("eligible", "not_eligible"), 
    rank: Joi.string().valid("excellent", "good", "average", "poor"), 
    certificates: Joi.array().items(
      Joi.object({
        type: Joi.string(), 
        issued_date: Joi.date().iso(), 
      })
    ), 
  });

  const { error } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

export const graduationValidation = {
  validateCreateGraduation,
  validateUpdateGraduation,
};
