import { Request, Response, NextFunction } from "express"

const unknownEndpoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'unknownEndpoint' })
}

const errorHandler = (error: any, _request: Request, response: Response, next: NextFunction) => {
  console.log(error)

  if(error.message) {
    return response.status(400).send(error.message)
  }

  return next(error)
}

export default {
  errorHandler,
  unknownEndpoint
}
