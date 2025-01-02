import { userModel } from '~/models/userModel';

const getAllUsers = async () => {
    try {
        const users = await userModel.User.find();
        return users
    } catch (error) {
        throw new Error('Error fetching users');
    }
};

const getUserById = async (id) => {
    try {
        const user = await userModel.User.findById(id);
        if (!user) {
        throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const createUser = async (userData) => {
    try {
        const newUser = new userModel.User({
            username: userData.username,
            password: userData.password,
            role: userData.role
        });

        const savedUser = await newUser.save();
        return savedUser;
    } catch (err) {
        throw new Error("Error while saving user: " + err.message);
    }
}

const updateUserById = async (id, data) => {
    try {
      const user = await userModel.User.findByIdAndUpdate(id, data, { new: true });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
}

const deleteUserById = async (id) => {
    try {
      const user = await userModel.User.findByIdAndDelete(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw error;
    }
}
  

export const userService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById
}
