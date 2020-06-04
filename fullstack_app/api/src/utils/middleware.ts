import { Request, Response, NextFunction } from "express"

const unknownEndpoint = (_request: Request, response: Response): Response => {
  return response.status(404).send({ error: 'unknownEndpoint' })
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

const errorHandler = (
  error: any,
  _request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  console.log(error)

  if(error && error.message) {
    return response.status(400).send(error.message)
  }

  return next(error)
}

export default {
  errorHandler,
  unknownEndpoint
}
