import express from 'express'
import { examController } from '~/controllers/examController'

const Router = express.Router()

Router.route('/')
    .get(examController.getExams)
    .post(examController.addExam)

Router.route('/:id')
    .get(examController.getExamById)
    .put(examController.updateExam)
    .delete(examController.deleteExam)

export const examRoutes = Router
