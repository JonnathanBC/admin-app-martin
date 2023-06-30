import 'dotenv/config'
import { connectDB } from './db/connectDB'
import cors from 'cors'
import express from 'express'
import mainRouter from './routes'
import cookieParser from 'cookie-parser'

const app = express()
connectDB()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // para cuando seteamos la cookie al nevagdor no de error de cors
}))

app.use('/api', mainRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('server running on port', PORT)
})
