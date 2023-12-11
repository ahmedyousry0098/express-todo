import express from 'express'
import { connectDB } from './db/connection'
import userRouter from './src/modules/user/user.routes'
import cors from 'cors'
import { globalErrorHandler } from './src/utils/errHandling'
import {config} from 'dotenv'
config({path: './env'})

const app = express()
const port = 8000

app.use(cors())

connectDB()

app.use('/auth', userRouter)
app.all('*', (req, res, next) => {
    return res.status(404).json({message: 'In-valid Method Or Url'})
})
app.use(globalErrorHandler)

app.listen(port, () => {
    console.log(`App Running On Port ${port}`)
})
