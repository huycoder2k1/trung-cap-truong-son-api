import { scheduleModel } from "~/models/scheduleModel";

const getAllSchedules = async () => {
    try {
        const schedules = await scheduleModel.Schedule.find();
        return schedules
    } catch (error) {
        throw new Error('Error fetching schedules');
    }
};

const getScheduleById = async (id) => {
    try {
        const schedule = await scheduleModel.Schedule.findById(id);
        if (!schedule) {
        throw new Error('Schedule not found');
        }
        return schedule;
    } catch (error) {
        throw error;
    }
}

const createSchedule = async (scheduleData) => {
    try {
        const newSchedule = new scheduleModel.Schedule({
            schedule_id: scheduleData.schedule_id,
            class_id: scheduleData.class_id,
            teacher_id: scheduleData.teacher_id,
            subject_id: scheduleData.subject_id,
            day_of_week: scheduleData.day_of_week,
            start_time: scheduleData.start_time,
            end_time: scheduleData.end_time
        });

        const savedSchedule = await newSchedule.save();
        return savedSchedule;
    } catch (err) {
        throw new Error("Error while saving schedule: " + err.message);
    }
}

const updateScheduleById = async (id, data) => {
    try {
      const schedule = await scheduleModel.Schedule.findByIdAndUpdate(id, data, { new: true });
      if (!schedule) {
        throw new Error('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw error;
    }
}

const deleteScheduleById = async (id) => {
    try {
      const schedule = await scheduleModel.Schedule.findByIdAndDelete(id);
      if (!schedule) {
        throw new Error('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw error;
    }
}
  

export const scheduleService = {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateScheduleById,
  deleteScheduleById
}
