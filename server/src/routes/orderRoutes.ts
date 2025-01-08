import { Controllers, Validators } from '@controllers'
import { asyncHandler } from '@utils'
import { Router } from 'express'

export const orderRoutes = Router()

orderRoutes.post(
  '/submit',
  Validators.order.submit,
  asyncHandler(Controllers.order.submit)
)
