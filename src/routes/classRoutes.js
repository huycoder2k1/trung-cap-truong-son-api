import express from 'express'
import { classController} from '~/controllers/classController'

const Router = express.Router()

Router.route('/')
    .get(classController.getClasses)
    .post(classController.addClass)

Router.route('/:id')
    .get(classController.getClassById)
    .put(classController.updateClass)
    .delete(classController.deleteClass)

export const classRoutes = Router
