import { subjectModel } from "~/models/subjectModel";

const getAllSubjects = async () => {
    try {
        const subjects = await subjectModel.Subject.find();
        return subjects
    } catch (error) {
        throw new Error('Error fetching subjects');
    }
};

const getSubjectById = async (id) => {
    try {
        const subject = await subjectModel.Subject.findById(id);
        if (!subject) {
        throw new Error('Subject not found');
        }
        return subject;
    } catch (error) {
        throw error;
    }
}

const createSubject = async (subjectData) => {
    try {
        const newSubject = new subjectModel.Subject({
            subject_id: subjectData.subject_id,
            name: subjectData.name,
            credits: subjectData.credits
        });

        const savedSubject = await newSubject.save();
        return savedSubject;
    } catch (err) {
        throw new Error("Error while saving subject: " + err.message);
    }
}

const updateSubjectById = async (id, data) => {
    try {
      const subject = await subjectModel.Subject.findByIdAndUpdate(id, data, { new: true });
      if (!subject) {
        throw new Error('Subject not found');
      }
      return subject;
    } catch (error) {
      throw error;
    }
}

const deleteSubjectById = async (id) => {
    try {
      const subject = await subjectModel.Subject.findByIdAndDelete(id);
      if (!subject) {
        throw new Error('Subject not found');
      }
      return subject;
    } catch (error) {
      throw error;
    }
}
  

export const subjectService = {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubjectById,
  deleteSubjectById
}
