import { Request, Response, NextFunction } from "express"

const unknownEndpoint = (_request: Request, response: Response): Response => {
  return response.status(404).send({ error: 'unknownEndpoint' })
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  console.log('middleware error', error)

  if(error.message.includes("Incorrect or missing")) {
    return response.status(400).send(error.message)
  }

  if(error.message.includes("Fruit not found")) {
    return response.status(400).send(error.message)
  }

  if (error.name === 'CastError') {
    return response.status(400).send('malformed field')
  } else if (error.name === 'ValidationError') {
    return response.status(400).json(error.message)
  }

  return next(error)
}

export default {
  errorHandler,
  unknownEndpoint
}
