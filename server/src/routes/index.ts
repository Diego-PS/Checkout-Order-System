import { Router } from 'express'
import { menuItemRoutes } from './menuItemRoutes'
import { orderRoutes } from './orderRoutes'

export const router = Router()

router.use('/item', menuItemRoutes)
router.use('/order', orderRoutes)
