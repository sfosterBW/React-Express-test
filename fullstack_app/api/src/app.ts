import express from 'express'
require('express-async-errors')
const app = express()
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import config from './utils/config'
import middleware from './utils/middleware'
import indexRouter from './controllers/index'
import fruitRouter from './controllers/fruits'
import testingRouter from './controllers/testing'

//TODO: Add get details for one fruit endpoint, tests first
//TODO: Oauth?
//TODO: Deploy to heroku?

if (config.MONGODB_URI) {
  mongoose
    .connect(config.MONGODB_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('connected to mongo')
    })
    .catch((error: any) => {
      console.log('could not connect to mongo', error.message)
    })
}

app.use(helmet())
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
