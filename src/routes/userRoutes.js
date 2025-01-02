import express from 'express'
import { userController} from '~/controllers/userController'

const Router = express.Router()

Router.route('/')
    .get(userController.getUsers)
    .post(userController.addUser)

Router.route('/:id')
    .get(userController.getUserById)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

export const userRoutes = Router
