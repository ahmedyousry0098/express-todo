import express from 'express'
import {config} from 'dotenv'
import { connectDB } from './db/connection'
import cors from 'cors'
config({path: './env'})

const app = express()
const port = 8000

app.use(cors())

connectDB()

app.listen(port, () => {
    console.log(`App Running On Port ${port}`)
})
