import express from 'express'
import {
  createClient,
  getClientById,
  getAllClients,
  updateClient
} from '../controllers/clientsController'
import { validateUser } from '../middlewares/authMiddleware'

const clientRoutes = express.Router()
clientRoutes.use(validateUser())

clientRoutes.get('/', getAllClients)
clientRoutes.post('/', createClient)
clientRoutes.get('/:id', getClientById)
clientRoutes.put('/:id', updateClient)

export default clientRoutes
