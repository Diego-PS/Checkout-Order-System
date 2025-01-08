import { MenuItemErrorType, MenuItemErrorTypeEnum } from './menuItemErrorType'
import {
  RequestValidationErrorType,
  RequestValidationErrorTypeEnum,
} from './requestValidationErrorType'

enum UnknowErrorTypeEnum {
  UNKNOWN = 'UNKNOWN',
}

export type ErrorType =
  | RequestValidationErrorType
  | MenuItemErrorType
  | 'UNKNOWN'

export const ErrorTypeEnums = {
  RequestValidation: RequestValidationErrorTypeEnum,
  MenuItem: MenuItemErrorTypeEnum,
  Unknown: UnknowErrorTypeEnum,
}

export * from './requestValidationErrorType'
