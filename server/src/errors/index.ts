import { Enums, ErrorType, HttpStatusCode } from '@enums'
import { getMessageFromErrorType } from './utils'

export class ApiError extends Error {
  public readonly statusCode: HttpStatusCode
  public readonly errorType: ErrorType

  constructor(
    statusCode: HttpStatusCode,
    errorType?: ErrorType,
    message?: string
  ) {
    const usedErrorType = errorType || Enums.ErrorType.Unknown.UNKNOWN
    const messageFromCode = getMessageFromErrorType(usedErrorType)
    super(message || messageFromCode)
    this.statusCode = statusCode
    this.errorType = usedErrorType
  }
}

export class BadRequestError extends ApiError {
  constructor(errorType?: ErrorType, message?: string) {
    super(Enums.HttpStatusCode.ClientErros.BAD_REQUEST, errorType, message)
  }
}

export class NotFoundError extends ApiError {
  constructor(errorType?: ErrorType, message?: string) {
    super(Enums.HttpStatusCode.ClientErros.NOT_FOUND, errorType, message)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(errorType?: ErrorType, message?: string) {
    super(Enums.HttpStatusCode.ClientErros.UNAUTHORIZED, errorType, message)
  }
}

export class ForbiddenError extends ApiError {
  constructor(errorType?: ErrorType, message?: string) {
    super(Enums.HttpStatusCode.ClientErros.FORBIDDEN, errorType, message)
  }
}

export class InternalServerError extends ApiError {
  constructor(errorType?: ErrorType, message?: string) {
    super(
      Enums.HttpStatusCode.ServerErrors.INTERNAL_SERVER_ERROR,
      errorType,
      message
    )
  }
}

export * from './requestValidationErrors'
export * from './menuItemErrors'
