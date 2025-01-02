import express from 'express'
import { teacherController } from '~/controllers/teacherController'

const Router = express.Router()

Router.route('/')
    .get(teacherController.getTeachers)
    .post(teacherController.addTeacher)

Router.route('/:id')
    .get(teacherController.getTeacherById)
    .put(teacherController.updateTeacher)
    .delete(teacherController.deleteTeacher)

export const teacherRoutes = Router
