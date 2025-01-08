import {
  ClientErrorsHttpStatusCode,
  ClientErrorsHttpStatusCodeEnum,
} from './clientErrors'
import {
  InformationalResponseHttpStatusCode,
  InformationalResponseHttpStatusCodeEnum,
} from './informationalResponse'
import {
  RedirectionHttpStatusCode,
  RedirectionHttpStatusCodeEnum,
} from './redirection'
import {
  ServerErrorsHttpStatusCode,
  ServerErrorsHttpStatusCodeEnum,
} from './serverErrors'
import { SuccessHttpStatusCode, SuccessHttpStatusCodeEnum } from './success'

export * from './clientErrors'
export * from './informationalResponse'
export * from './redirection'
export * from './serverErrors'
export * from './success'

export type HttpStatusCode =
  | InformationalResponseHttpStatusCode
  | SuccessHttpStatusCode
  | RedirectionHttpStatusCode
  | ClientErrorsHttpStatusCode
  | ServerErrorsHttpStatusCode

export const HttpStatusCodeEnums = {
  InformationalResponse: InformationalResponseHttpStatusCodeEnum,
  Success: SuccessHttpStatusCodeEnum,
  Redirection: RedirectionHttpStatusCodeEnum,
  ClientErros: ClientErrorsHttpStatusCodeEnum,
  ServerErrors: ServerErrorsHttpStatusCodeEnum,
}
