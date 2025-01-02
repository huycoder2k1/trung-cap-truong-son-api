import Joi from "joi";

const validateUpdateSchedule = (data) => {
    const schema = Joi.object({
        schedule_id: Joi.string().min(3).max(50), 
        class_id: Joi.string().hex().length(24), 
        teacher_id: Joi.string().hex().length(24), 
        subject_id: Joi.string().hex().length(24), 
        day_of_week: Joi.string().valid(
            'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'
        ), 
        start_time: Joi.string(), 
        end_time: Joi.string(), 
    });

    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);
};

const validateCreateSchedule = (schedule) => {
    const schema = Joi.object({
        schedule_id: Joi.string().min(3).max(50).required(), 
        class_id: Joi.string().hex().length(24).required(), 
        teacher_id: Joi.string().hex().length(24).required(), 
        subject_id: Joi.string().hex().length(24).required(), 
        day_of_week: Joi.string().valid(
            'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'
        ).required(), 
        start_time: Joi.string().required(),
        end_time: Joi.string().required(),
    });

    const { error } = schema.validate(schedule);
    if (error) throw new Error(error.details[0].message);
};

export const scheduleValidation = {
    validateUpdateSchedule,
    validateCreateSchedule,
};
