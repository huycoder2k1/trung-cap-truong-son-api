import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { examService } from '~/services/examService';
import { commonValidation } from '~/validations/commonValidation';
import { examValidation } from '~/validations/examValidation';

const getExams = async (req, res) => {
    try {
        const exams = await examService.getAllExams()
        res.status(StatusCodes.OK).json(exams);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getExamById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const exam = await examService.getExamById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: exam });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addExam = async (req, res) => {
    try {
        // const { error } = examValidation.validateCreateExam(req.body);
        // if (error) {
        //     return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        // }

        const examData = req.body;
        const savedExam = await examService.createExam(examData);

        res.status(StatusCodes.CREATED).json(savedExam);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateExam = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      examValidation.validateUpdateExam(req.body);
  
      const updatedExam = await examService.updateExamById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedExam });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteExam = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedExam = await examService.deleteExamById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedExam });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const examController = {
    getExams, 
    getExamById, 
    addExam,
    updateExam,
    deleteExam
}