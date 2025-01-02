import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { scoreService } from '~/services/scoreService';
import { commonValidation } from '~/validations/commonValidation';
import { scoreValidation } from '~/validations/scoreValidation';

const getScores = async (req, res) => {
    try {
        const scores = await scoreService.getAllScores()
        res.status(StatusCodes.OK).json(scores);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getScoreById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const score = await scoreService.getScoreById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: score });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addScore = async (req, res) => {
    try {
        const { error } = scoreValidation.validateCreateScore(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        }

        const scoreData = req.body;
        const savedScore = await scoreService.createScore(scoreData);

        res.status(StatusCodes.CREATED).json(savedScore);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateScore = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      scoreValidation.validateUpdateScore(req.body);
  
      const updatedScore = await scoreService.updateScoreById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedScore });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteScore = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedScore = await scoreService.deleteScoreById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedScore });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const scoreController = {
    getScores, 
    getScoreById, 
    addScore,
    updateScore,
    deleteScore
}