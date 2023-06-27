import express from 'express'
import authRoutes from './authRoutes'

const mainRouter = express.Router()

mainRouter.use('/auth', authRoutes)

export default mainRouter
