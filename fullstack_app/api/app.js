const express = require('express')
require('express-async-errors')
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require("cors")
const middleware = require('./utils/middleware')
const indexRouter = require('./routes/index')
const fruitAPIRouter = require("./routes/fruits")

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

//TODO: Convert to typescript

app.use('/', indexRouter)
app.use("/fruit-api", fruitAPIRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
