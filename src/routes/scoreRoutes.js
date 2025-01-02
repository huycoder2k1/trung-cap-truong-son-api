import express from 'express'
import { scoreController } from '~/controllers/scoreController'

const Router = express.Router()

Router.route('/')
    .get(scoreController.getScores)
    .post(scoreController.addScore)

Router.route('/:id')
    .get(scoreController.getScoreById)
    .put(scoreController.updateScore)
    .delete(scoreController.deleteScore)

export const scoreRoutes = Router
