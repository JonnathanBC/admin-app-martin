import express from 'express'
import { generateCode, login } from '../controllers/authController'

const authRoutes = express.Router()

authRoutes.post('/login/:email', login)
authRoutes.post('/login/:email/code', generateCode)

export default authRoutes
