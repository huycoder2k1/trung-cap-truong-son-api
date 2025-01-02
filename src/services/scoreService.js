import { scoreModel } from "~/models/scoreModel";

const getAllScores = async () => {
    try {
        const scores = await scoreModel.Score.find();
        return scores
    } catch (error) {
        throw new Error('Error fetching scores');
    }
};

const getScoreById = async (id) => {
    try {
        const score = await scoreModel.Score.findById(id);
        if (!score) {
        throw new Error('Score not found');
        }
        return score;
    } catch (error) {
        throw error;
    }
}

const createScore = async (scoreData) => {
    try {
        const newScore = new scoreModel.Score({
            student_id: scoreData.student_id,
            subject_id: scoreData.subject_id,
            scores: scoreData.scores
        });

        const savedScore = await newScore.save();
        return savedScore;
    } catch (err) {
        throw new Error("Error while saving score: " + err.message);
    }
}

const updateScoreById = async (id, data) => {
    try {
      const score = await scoreModel.Score.findByIdAndUpdate(id, data, { new: true });
      if (!score) {
        throw new Error('Score not found');
      }
      return score;
    } catch (error) {
      throw error;
    }
}

const deleteScoreById = async (id) => {
    try {
      const score = await scoreModel.Score.findByIdAndDelete(id);
      if (!score) {
        throw new Error('Score not found');
      }
      return score;
    } catch (error) {
      throw error;
    }
}
  

export const scoreService = {
  getAllScores,
  getScoreById,
  createScore,
  updateScoreById,
  deleteScoreById
}
