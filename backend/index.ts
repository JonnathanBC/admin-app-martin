import 'dotenv/config'
import { connectDB } from './db/connectDB'
import cors from 'cors'
import express from 'express'
import mainRouter from './routes'
import coockieParser from 'cookie-parser'

const app = express()
connectDB()

app.use(express.json())
app.use(coockieParser())
app.use(cors({
  origin: 'http://127.0.0.1:3000',
  credentials: true // para cuando seteamos la cookie al nevagdor no de error de cors
}))

app.use('/api', mainRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('server running on port', PORT)
})
