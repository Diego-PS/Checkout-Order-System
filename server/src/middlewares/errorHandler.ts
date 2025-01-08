import { Enums } from '@enums'
import { ApiError } from '@errors'
import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).send({
      errorType: err.errorType,
      message: err.message,
    })
    next()
  }
  const message = err instanceof Error ? err.message : undefined
  res.status(Enums.HttpStatusCode.ServerErrors.INTERNAL_SERVER_ERROR).send({
    errorType: Enums.ErrorType.Unknown.UNKNOWN,
    message,
  })
  next()
}
