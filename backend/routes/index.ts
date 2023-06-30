import express from 'express'
import authRoutes from './authRoutes'
import salesRoutes from './salesRoutes'
import clientRoutes from './clientRoutes'

const mainRouter = express.Router()

mainRouter.use('/auth', authRoutes)
mainRouter.use('/sales', salesRoutes)
mainRouter.use('/clients', clientRoutes)

export default mainRouter
