import { Router } from 'express'
import { menuItemRoutes } from './menuItemRoutes'
import { orderRoutes } from './orderRoutes'
import { categoryRoutes } from './categoryRoutes'

export const router = Router()

router.use('/item', menuItemRoutes)
router.use('/order', orderRoutes)
router.use('/category', categoryRoutes)
