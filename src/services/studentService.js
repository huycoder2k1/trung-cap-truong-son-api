import { studentModel } from "~/models/scoreModel";

const getAllStudents = async () => {
    try {
        const students = await studentModel.Student.find();
        return students
    } catch (error) {
        throw new Error('Error fetching students');
    }
};

const getStudentById = async (id) => {
    try {
        const student = await studentModel.Student.findById(id);
        if (!student) {
        throw new Error('Student not found');
        }
        return student;
    } catch (error) {
        throw error;
    }
}

const createStudent = async (studentData) => {
    try {
        const newStudent = new studentModel.Student({
            student_id: studentData.student_id,
            name: studentData.name,
            dob: studentData.dob,
            address: studentData.address,
            phone: studentData.phone,
            email: studentData.email,
            class_id: studentData.class_id,
            status: studentData.status
        });

        const savedStudent = await newStudent.save();
        return savedStudent;
    } catch (err) {
        throw new Error("Error while saving student: " + err.message);
    }
}

const updateStudentById = async (id, data) => {
    try {
      const student = await studentModel.Student.findByIdAndUpdate(id, data, { new: true });
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw error;
    }
}

const deleteStudentById = async (id) => {
    try {
      const student = await studentModel.Student.findByIdAndDelete(id);
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw error;
    }
}
  

export const studentService = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById
}
