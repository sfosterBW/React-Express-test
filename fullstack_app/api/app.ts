import express from 'express'
require('express-async-errors')
const app = express()
import bodyParser from 'body-parser'
import logger from 'morgan'
import cors from 'cors'
import middleware from './utils/middleware'
import indexRouter from './routes/index'
import fruitAPIRouter from './routes/fruits'

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

//TODO: Exclude ts test from running
//TODO: Add parsing to all inputs
//TOPO: Tweak linting rules

app.use('/', indexRouter)
app.use("/fruit-api", fruitAPIRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
