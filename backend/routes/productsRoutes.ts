import express from 'express'
import { getByCode } from '../controllers/productsController'
import { validateUser } from '../middlewares/authMiddleware'

const productsRoutes = express.Router()
productsRoutes.use(validateUser())

productsRoutes.get('/:code', getByCode)

export default productsRoutes
