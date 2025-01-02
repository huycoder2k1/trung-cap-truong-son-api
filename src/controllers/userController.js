import { StatusCodes } from 'http-status-codes'
import { valid } from 'joi';
import { userService } from '~/services/userService';
import { commonValidation } from '~/validations/commonValidation';
import { userValidation } from '~/validations/userValidation';

const getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.status(StatusCodes.OK).json(users);
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error', error: err.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        commonValidation.validateParamId(id);

        const user = await userService.getUserById(id);
        return res.status(StatusCodes.OK).json({ success: true, data: user });
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const addUser = async (req, res) => {
    try {
        const { error } = userValidation.validateCreateUser(req.body);
        if (error) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: error.details[0].message });
        }

        const userData = req.body;
        const savedUser = await userService.createUser(userData);

        res.status(StatusCodes.CREATED).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
    }
}

const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
      userValidation.validateUpdateUser(req.body);
  
      const updatedUser = await userService.updateUserById(id, req.body);
      return res.status(StatusCodes.OK).json({ success: true, data: updatedUser });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      commonValidation.validateParamId(id);
  
      const deletedUser = await userService.deleteUserById(id);
      return res.status(StatusCodes.OK).json({ success: true, data: deletedUser });
    } catch (error) {
      return res.status(StatusCodes.NOT_FOUND).json({ success: false, message: error.message });
    }
}

export const userController = {
    getUsers, 
    getUserById, 
    addUser,
    updateUser,
    deleteUser
}