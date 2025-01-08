import { Controllers, Validators } from '@controllers'
import { asyncHandler } from '@utils'
import { Router } from 'express'

export const menuItemRoutes = Router()

menuItemRoutes.get(
  '/',
  Validators.menuItem.search,
  asyncHandler(Controllers.menuItem.search)
)
