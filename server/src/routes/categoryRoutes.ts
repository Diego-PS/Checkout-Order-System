import { Controllers } from '@controllers'
import { asyncHandler } from '@utils'
import { Router } from 'express'

export const categoryRoutes = Router()

categoryRoutes.get('/', asyncHandler(Controllers.category.get))
