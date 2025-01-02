import express from 'express'
import { subjectController } from '~/controllers/subjectController'

const Router = express.Router()

Router.route('/')
    .get(subjectController.getSubjects)
    .post(subjectController.addSubject)

Router.route('/:id')
    .get(subjectController.getSubjectById)
    .put(subjectController.updateSubject)
    .delete(subjectController.deleteSubject)

export const subjectRoutes = Router
