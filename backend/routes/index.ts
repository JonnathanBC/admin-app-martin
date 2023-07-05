import express from 'express'
import authRoutes from './authRoutes'
import salesRoutes from './salesRoutes'
import clientRoutes from './clientRoutes'
import productsRoutes from './productsRoutes'

const mainRouter = express.Router()

mainRouter.use('/auth', authRoutes)
mainRouter.use('/sales', salesRoutes)
mainRouter.use('/clients', clientRoutes)
mainRouter.use('/products', productsRoutes)

export default mainRouter
