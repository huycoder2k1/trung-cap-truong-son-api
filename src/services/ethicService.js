import { ethicModel } from "~/models/ethicModel";

const getAllEthics = async () => {
    try {
        const ethics = await ethicModel.Ethic.find()
        return ethics
    } catch (error) {
        throw new Error('Error fetching ethics');
    }
};

const getEthicById = async (id) => {
    try {
        const ethic = await ethicModel.Ethic.findById(id)
        if (!ethic) {
        throw new Error('Ethic not found');
        }
        return ethic;
    } catch (error) {
        throw error;
    }
}

const createEthic = async (ethicData) => {
    try {
        const newEthic = new ethicModel.Ethic({
            student_id: ethicData.student_id,
            semester: ethicData.semester,
            year: ethicData.year,
            ethics_score: ethicData.ethics_score
        });

        const savedEthic = await newEthic.save();
        return savedEthic;
    } catch (err) {
        throw new Error("Error while saving ethic: " + err.message);
    }
}

const updateEthicById = async (id, data) => {
    try {
      const ethic = await ethicModel.Ethic.findByIdAndUpdate(id, data, { new: true })
      if (!ethic) {
        throw new Error('ethic not found');
      }
      return ethic;
    } catch (error) {
      throw error;
    }
}

const deleteEthicById = async (id) => {
    try {
      const ethic = await ethicModel.Ethic.findByIdAndDelete(id)
      if (!ethic) {
        throw new Error('Ethic not found');
      }
      return ethic;
    } catch (error) {
      throw error;
    }
}
  

export const ethicService = {
  getAllEthics,
  getEthicById,
  createEthic,
  updateEthicById,
  deleteEthicById
}
