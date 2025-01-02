import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { ethicService } from '~/services/ethicService';
import { commonValidation } from '~/validations/commonValidation';
import { ethicValidation } from '~/validations/ethicValidation';

const getEthics = async (req, res) => {
    try {
        const ethics = await ethicService.getAllEthics()
        res.status(StatusCodes.OK).json(ethics);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getEthicById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const ethic = await ethicService.getEthicById(id)
        return res.status(StatusCodes.OK).json({ success: true, data: ethic });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addEthic = async (req, res) => {
    try {
        // const { error } = ethicValidation.validateCreateEthic(req.body)
        // if (error) {
        //     return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        // }

        const ethicData = req.body;
        const savedEthic = await ethicService.createEthic(ethicData)

        
        res.status(StatusCodes.CREATED).json(savedEthic);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateEthic = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      ethicValidation.validateUpdateEthic(req.body)
  
      const updatedEthic = await ethicService.updateEthicById(id, req.body)
      return res.status(StatusCodes.OK).json({ success: true, data: updatedEthic });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteEthic = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedEthic = await ethicService.deleteEthicById(id)
      return res.status(StatusCodes.OK).json({ success: true, data: deletedEthic });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const ethicController = {
    getEthics, 
    getEthicById, 
    addEthic,
    updateEthic,
    deleteEthic
}