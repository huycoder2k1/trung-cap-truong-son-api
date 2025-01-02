import { examModel } from "~/models/examModel";

const getAllExams = async () => {
    try {
        const exams = await examModel.Exam.find();
        return exams
    } catch (error) {
        throw new Error('Error fetching exams');
    }
};

const getExamById = async (id) => {
    try {
        const exam = await examModel.Exam.findById(id);
        if (!exam) {
        throw new Error('Exam not found');
        }
        return exam;
    } catch (error) {
        throw error;
    }
}

const createExam = async (examData) => {
    try {
        const newExam = new examModel.Exam({
            exam_id: examData.exam_id,
            class_id: examData.class_id,
            subject_id: examData.subject_id,
            date: examData.date,
            students: examData.students
        });

        const savedExam = await newExam.save();
        return savedExam;
    } catch (err) {
        throw new Error("Error while saving exam: " + err.message);
    }
}

const updateExamById = async (id, data) => {
    try {
      const exam = await examModel.Exam.findByIdAndUpdate(id, data, { new: true });
      if (!exam) {
        throw new Error('Exam not found');
      }
      return exam;
    } catch (error) {
      throw error;
    }
}

const deleteExamById = async (id) => {
    try {
      const exam = await examModel.Exam.findByIdAndDelete(id);
      if (!exam) {
        throw new Error('Exam not found');
      }
      return exam;
    } catch (error) {
      throw error;
    }
}
  

export const examService = {
  getAllExams,
  getExamById,
  createExam,
  updateExamById,
  deleteExamById
}
