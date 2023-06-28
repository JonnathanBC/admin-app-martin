import 'dotenv/config'
import { connectDB } from './db/connectDB'
import cors from 'cors'
import express from 'express'
import mainRouter from './routes'

const app = express()
connectDB()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use('/api', mainRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log('server running on port', PORT)
})
