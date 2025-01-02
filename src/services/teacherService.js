import { teacherModel } from "~/models/teacherModel";

const getAllTeachers = async () => {
    try {
        const teachers = await teacherModel.Teacher.find();
        return teachers
    } catch (error) {
        throw new Error('Error fetching teachers');
    }
};

const getTeacherById = async (id) => {
    try {
        const teacher = await teacherModel.Teacher.findById(id);
        if (!teacher) {
        throw new Error('Teacher not found');
        }
        return teacher;
    } catch (error) {
        throw error;
    }
}

const createTeacher = async (teacherData) => {
    try {
        const newTeacher = new teacherModel.Teacher({
            teacher_id: teacherData.teacher_id,
            name: teacherData.name,
            specialization: teacherData.specialization,
            phone: teacherData.phone,
            email: teacherData.email
        });

        const savedTeacher = await newTeacher.save();
        return savedTeacher;
    } catch (err) {
        throw new Error("Error while saving teacher: " + err.message);
    }
}

const updateTeacherById = async (id, data) => {
    try {
      const teacher = await teacherModel.Teacher.findByIdAndUpdate(id, data, { new: true });
      if (!teacher) {
        throw new Error('Teacher not found');
      }
      return teacher;
    } catch (error) {
      throw error;
    }
}

const deleteTeacherById = async (id) => {
    try {
      const teacher = await teacherModel.Teacher.findByIdAndDelete(id);
      if (!teacher) {
        throw new Error('Teacher not found');
      }
      return teacher;
    } catch (error) {
      throw error;
    }
}
  

export const teacherService = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacherById,
  deleteTeacherById
}
