import express from 'express'
import { graduationController } from '~/controllers/graduationController'

const Router = express.Router()

Router.route('/')
    .get(graduationController.getGraduations)
    .post(graduationController.addGraduation)

Router.route('/:id')
    .get(graduationController.getGraduationById)
    .put(graduationController.updateGraduation)
    .delete(graduationController.deleteGraduation)

export const graduationRoutes = Router
