import express from 'express'
import { scheduleController } from '~/controllers/scheduleController'

const Router = express.Router()

Router.route('/')
    .get(scheduleController.getSchedules)
    .post(scheduleController.addSchedule)

Router.route('/:id')
    .get(scheduleController.getScheduleById)
    .put(scheduleController.updateSchedule)
    .delete(scheduleController.deleteSchedule)

export const scheduleRoutes = Router
