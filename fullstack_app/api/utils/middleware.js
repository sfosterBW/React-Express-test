const createError = require('http-errors')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknownEndpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.log(error)

  if(error.message) {
    return response.status(400).send(error.message)
  }

  next(error)
}

module.exports = {
  errorHandler,
  unknownEndpoint
}
