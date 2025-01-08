import { Enums } from '@enums'
import { BadRequestError } from '@errors'

export class InvalidRequestBody extends BadRequestError {
  constructor(message?: string) {
    super(Enums.ErrorType.RequestValidation.INVALID_REQUEST_BODY, message)
  }
}

export class InvalidRequestParams extends BadRequestError {
  constructor(message?: string) {
    super(Enums.ErrorType.RequestValidation.INVALID_REQUEST_PARAMS, message)
  }
}

export class InvalidRequestQueryParams extends BadRequestError {
  constructor(message?: string) {
    super(
      Enums.ErrorType.RequestValidation.INVALID_REQUEST_QUERY_PARAMS,
      message
    )
  }
}
