import { graduationModel } from "~/models/graduationModel";

const getAllGraduations = async () => {
    try {
        const graduations = await graduationModel.Graduation.find();
        return graduations
    } catch (error) {
        throw new Error('Error fetching graduations');
    }
};

const getGraduationById = async (id) => {
    try {
        const graduation = await graduationModel.Graduation.findById(id);
        if (!graduation) {
        throw new Error('Graduation not found');
        }
        return graduation;
    } catch (error) {
        throw error;
    }
}

const createGraduation = async (graduationData) => {
    try {
        const newGraduation = new graduationModel.Graduation({
            student_id: graduationData.student_id,
            status: graduationData.status,
            rank: graduationData.rank,
            certificates: graduationData.certificates
        });

        const savedGraduation = await newGraduation.save();
        return savedGraduation;
    } catch (err) {
        throw new Error("Error while saving graduation: " + err.message);
    }
}

const updateGraduationById = async (id, data) => {
    try {
      const graduation = await graduationModel.Graduation.findByIdAndUpdate(id, data, { new: true });
      if (!graduation) {
        throw new Error('Graduation not found');
      }
      return graduation;
    } catch (error) {
      throw error;
    }
}

const deleteGraduationById = async (id) => {
    try {
      const graduation = await graduationModel.Graduation.findByIdAndDelete(id);
      if (!graduation) {
        throw new Error('Graduation not found');
      }
      return graduation;
    } catch (error) {
      throw error;
    }
}
  

export const graduationService = {
  getAllGraduations,
  getGraduationById,
  createGraduation,
  updateGraduationById,
  deleteGraduationById
}
