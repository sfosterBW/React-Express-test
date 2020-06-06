import express from 'express'
require('express-async-errors')
const app = express()
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import middleware from './utils/middleware'
import indexRouter from './routes/index'
import fruitRouter from './routes/fruits'
import testingRouter from './routes/testing'

//TODO: Connect to mongodb
//TODO: Add get details for one fruit endpoint
//TODO: Oauth?
//TODO: Deploy to heroku?

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/check', indexRouter)
app.use('/fruit-api', fruitRouter)
app.use('/testing', testingRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
