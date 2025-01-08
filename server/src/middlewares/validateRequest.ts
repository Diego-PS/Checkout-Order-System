import {
  BadRequestError,
  InvalidRequestBody,
  InvalidRequestParams,
  InvalidRequestQueryParams,
} from '@errors'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

export function validateRequest<
  BodyType extends object,
  ParamsType extends object,
  QueryType extends object,
>(
  bodyType?: ClassConstructor<BodyType>,
  paramsType?: ClassConstructor<ParamsType>,
  queryType?: ClassConstructor<QueryType>
) {
  return async (
    req: Request<ParamsType, QueryType, BodyType>,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      if (bodyType !== undefined)
        await validateRequestElement(req.body, bodyType, InvalidRequestBody)
      if (paramsType !== undefined)
        await validateRequestElement(
          req.params,
          paramsType,
          InvalidRequestParams
        )
      if (queryType !== undefined)
        await validateRequestElement<QueryType, InvalidRequestQueryParams>(
          req.query as QueryType,
          queryType,
          InvalidRequestQueryParams
        )
      next()
    } catch (error) {
      next(error)
    }
  }
}

export const validateRequestElement = async <
  ElementType extends object,
  InvalidRequestError extends BadRequestError,
>(
  elements: ElementType,
  elementsType: ClassConstructor<ElementType>,
  ErrorClass: new (message?: string) => InvalidRequestError
) => {
  try {
    elements = plainToInstance(elementsType, elements)
    await validateOrReject(elements, {
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : undefined
    throw new ErrorClass(message)
  }
}
