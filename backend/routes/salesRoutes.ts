import express from 'express'
import { createSale, getAllSales } from '../controllers/salesController'
import { validateUser } from '../middlewares/authMiddleware'

const salesRoutes = express.Router()
salesRoutes.use(validateUser())

salesRoutes.get('/', getAllSales)
salesRoutes.post('/', createSale)

export default salesRoutes
