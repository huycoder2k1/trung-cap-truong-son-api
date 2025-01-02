import express from 'express'
import { userRoutes } from '~/routes/userRoutes'
import { classRoutes } from './classRoutes'
import { ethicRoutes } from './ethicRoutes'
import { examRoutes } from './examRoutes'
import { graduationRoutes } from './graduationRoutes'
import { scoreRoutes } from './scoreRoutes'
import { studentRoutes } from './studentRoutes'
import { teacherRoutes } from './teacherRoutes'
import { subjectRoutes } from './subjectRoutes'
import { scheduleRoutes } from './scheduleRoutes'

const Router = express.Router()

Router.use('/users', userRoutes)
Router.use('/classes', classRoutes)
Router.use('/ethics', ethicRoutes)
Router.use('/exams', examRoutes)
Router.use('/graduations', graduationRoutes)
Router.use('/scores', scoreRoutes)
Router.use('/students', studentRoutes)
Router.use('/teachers', teacherRoutes)
Router.use('/subjects', subjectRoutes)
Router.use('/schedules', scheduleRoutes)

export const APIs = Router
