import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { scheduleService } from '~/services/scheduleService';
import { commonValidation } from '~/validations/commonValidation';
import { scheduleValidation } from '~/validations/scheduleValidation';

const getSchedules = async (req, res) => {
    try {
        const schedules = await scheduleService.getAllSchedules()
        res.status(StatusCodes.OK).json(schedules);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getScheduleById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const schedule = await scheduleService.getScheduleById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: schedule });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addSchedule = async (req, res) => {
    try {
        const { error } = scheduleValidation.validateCreateSchedule(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        }

        const scheduleData = req.body;
        const savedSchedule = await scheduleService.createSchedule(scheduleData);

        res.status(StatusCodes.CREATED).json(savedSchedule);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      scheduleValidation.validateUpdateSchedule(req.body);
  
      const updatedSchedule = await scheduleService.updateScheduleById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedSchedule });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteSchedule = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedSchedule = await scheduleService.deleteScheduleById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedSchedule });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const scheduleController = {
    getSchedules, 
    getScheduleById, 
    addSchedule,
    updateSchedule,
    deleteSchedule
}