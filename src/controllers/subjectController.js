import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { subjectService } from '~/services/subjectService';
import { commonValidation } from '~/validations/commonValidation';
import { subjectValidation } from '~/validations/subjectValidation';

const getSubjects = async (req, res) => {
    try {
        const subjects = await subjectService.getAllSubjects()
        res.status(StatusCodes.OK).json(subjects);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getSubjectById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const subject = await subjectService.getSubjectById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: subject });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addSubject = async (req, res) => {
    try {
        const { error } = subjectValidation.validateCreateSubject(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        }

        const subjectData = req.body;
        const savedSubject = await subjectService.createSubject(subjectData);

        res.status(StatusCodes.CREATED).json(savedSubject);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateSubject = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      subjectValidation.validateUpdateSubject(req.body);
  
      const updatedSubject = await subjectService.updateSubjectById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedSubject });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteSubject = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedSubject = await subjectService.deleteSubjectById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedSubject });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const subjectController = {
    getSubjects, 
    getSubjectById, 
    addSubject,
    updateSubject,
    deleteSubject
}