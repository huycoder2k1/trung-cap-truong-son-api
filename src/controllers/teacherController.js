import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { teacherService } from '~/services/teacherService';
import { commonValidation } from '~/validations/commonValidation';
import { teacherValidation } from '~/validations/teacherValidation';

const getTeachers = async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers()
        res.status(StatusCodes.OK).json(teachers);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const teacher = await teacherService.getTeacherById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: teacher });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addTeacher = async (req, res) => {
    try {
        const { error } = teacherValidation.validateCreateTeacher(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        }

        const teacherData = req.body;
        const savedTeacher = await teacherService.createTeacher(teacherData);

        res.status(StatusCodes.CREATED).json(savedTeacher);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      teacherValidation.validateUpdateTeacher(req.body);
  
      const updatedTeacher = await teacherService.updateTeacherById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedTeacher });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedTeacher = await teacherService.deleteTeacherById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedTeacher });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const teacherController = {
    getTeachers, 
    getTeacherById, 
    addTeacher,
    updateTeacher,
    deleteTeacher
}