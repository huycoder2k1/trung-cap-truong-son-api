import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { graduationService } from '~/services/graduationService';
import { commonValidation } from '~/validations/commonValidation';
import { graduationValidation } from '~/validations/graduationValidation';

const getGraduations = async (req, res) => {
    try {
        const graduations = await graduationService.getAllGraduations()
        res.status(StatusCodes.OK).json(graduations);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getGraduationById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const graduation = await graduationService.getGraduationById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: graduation });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addGraduation = async (req, res) => {
    try {
        // const { error } = graduationValidation.validateCreateGraduation(req.body);
        // if (error) {
        //     return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        // }

        const graduationData = req.body;
        const savedGraduation = await graduationService.createGraduation(graduationData);

        res.status(StatusCodes.CREATED).json(savedGraduation);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateGraduation = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      graduationValidation.validateUpdateGraduation(req.body);
  
      const updatedGraduation = await graduationService.updateGraduationById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedGraduation });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteGraduation = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedGraduation = await graduationService.deleteGraduationById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedGraduation });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const graduationController = {
    getGraduations, 
    getGraduationById, 
    addGraduation,
    updateGraduation,
    deleteGraduation
}