import express from 'express'
import { ethicController } from '~/controllers/ethicController'

const Router = express.Router()

Router.route('/')
    .get(ethicController.getEthics)
    .post(ethicController.addEthic)

Router.route('/:id')
    .get(ethicController.getEthicById)
    .put(ethicController.updateEthic)
    .delete(ethicController.deleteEthic)

export const ethicRoutes = Router
