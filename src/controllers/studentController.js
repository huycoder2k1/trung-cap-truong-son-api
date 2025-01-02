import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { studentService } from '~/services/studentService';
import { commonValidation } from '~/validations/commonValidation';
import { studentValidation } from '~/validations/studentValidation';

const getStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents()
        res.status(StatusCodes.OK).json(students);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const student = await studentService.getStudentById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: student });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addStudent = async (req, res) => {
    try {
        const { error } = studentValidation.validateCreateStudent(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        }

        const studentData = req.body;
        const savedStudent = await studentService.createStudent(studentData);

        res.status(StatusCodes.CREATED).json(savedStudent);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateStudent = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      studentValidation.validateUpdateStudent(req.body);
  
      const updatedStudent = await studentService.updateStudentById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedStudent });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteStudent = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedStudent = await studentService.deleteStudentById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedStudent });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const studentController = {
    getStudents, 
    getStudentById, 
    addStudent,
    updateStudent,
    deleteStudent
}