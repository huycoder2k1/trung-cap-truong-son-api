import Joi from "joi";

const validateCreateExam = (data) => {
  const schema = Joi.object({
    exam_id: Joi.string().min(3).max(50).required(), 
    class_id: Joi.string().required(), 
    subject_id: Joi.string().required(), 
    date: Joi.date().iso().required(), 
    students: Joi.array()
      .items(
        Joi.object({
          student_id: Joi.string().required(),
          status: Joi.string()
            .valid("attended", "absent") 
            .required(),
        })
      )
      .required(),
  });

  const { error } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

const validateUpdateExam = (data) => {
  const schema = Joi.object({
    exam_id: Joi.string().min(3).max(50), 
    class_id: Joi.string(), 
    subject_id: Joi.string(), 
    date: Joi.date().iso(), 
    students: Joi.array().items(
      Joi.object({
        student_id: Joi.string(), 
        status: Joi.string().valid("attended", "absent"), 
      })
    ), 
  });

  const { error } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
};

export const examValidation = {
  validateCreateExam,
  validateUpdateExam,
};
