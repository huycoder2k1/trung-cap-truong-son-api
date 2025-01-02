import express from 'express'
import { studentController } from '~/controllers/studentController'

const Router = express.Router()

Router.route('/')
    .get(studentController.getStudents)
    .post(studentController.addStudent)

Router.route('/:id')
    .get(studentController.getStudentById)
    .put(studentController.updateStudent)
    .delete(studentController.deleteStudent)

export const studentRoutes = Router
