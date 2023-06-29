import express from 'express'
import authRoutes from './authRoutes'
import salesRoutes from './salesRoutes'

const mainRouter = express.Router()

mainRouter.use('/auth', authRoutes)
mainRouter.use('/sales', salesRoutes)

export default mainRouter
