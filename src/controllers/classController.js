import { StatusCodes } from 'http-status-codes'
import { classService } from '~/services/classService'
import { commonValidation } from '~/validations/commonValidation'
import { classValidation } from '~/validations/classValidation'

const getClasses = async (req, res) => {
    try {
        const classes = await classService.getAllClasses();
        return res.status(StatusCodes.OK).json(classes);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}

const getClassById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const user = await classService.getClassById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: user });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addClass = async (req, res) => {
    try {
        const { error } = classValidation.validateCreateClass(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        }

        const classData = req.body;
        const savedClass = await classService.createClass(classData);

        res.status(StatusCodes.CREATED).json(savedClass);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateClass = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      classValidation.validateUpdateClass(req.body);
  
      const updatedUser = await classService.updateClassById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedUser });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteClass = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedClass = await classService.deleteClassById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedClass });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const classController = {
    getClasses,
    getClassById,
    addClass,
    updateClass,
    deleteClass
}