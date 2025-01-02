import { classModel } from "~/models/classModel"

const getAllClasses = async () => {
    try {
        const classes = await classModel.Class.find({});
        return classes;
    } catch (error) {
        throw new Error('Failed to fetch classes');
    }
}

const getClassById = async (id) => {
    try {
        const classes = await classModel.Class.findById(id);
        if (!classes) {
            throw new Error('User not found');
        }
        return classes;
    } catch (error) {
        throw error;
    }
}

const createClass = async (classData) => {
    try {
        const newClass = new classModel.Class({
            class_id: classData.class_id,
            name: classData.name,
            start_date: classData.start_date,
            end_date: classData.end_date,
            teacher_id: classData.teacher_id,
            students: classData.students
        });

        const savedClass = await newClass.save();
        return savedClass;
    } catch (err) {
        throw new Error("Error while saving class: " + err.message);
    }
}

const updateClassById = async (id, data) => {
    try {
        const classes = await classModel.Class.findByIdAndUpdate(id, data, { new: true });
        if (!classes) {
            throw new Error('Class not found');
        }
        return classes;
    } catch (error) {
      throw error;
    }
}

const deleteClassById = async (id) => {
    try {
      const classes = await classModel.Class.findByIdAndDelete(id);
      if (!classes) {
        throw new Error('Class not found');
      }
      return classes;
    } catch (error) {
      throw error;
    }
}

export const classService = {
    getAllClasses,
    getClassById,
    createClass,
    updateClassById,
    deleteClassById
}