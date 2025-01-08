import { MenuItemController, MenuItemValidators } from './menuItem'
import { OrderController, OrderValidators } from './order'

export const Controllers = {
  menuItem: MenuItemController,
  order: OrderController,
}

export const Validators = {
  menuItem: MenuItemValidators,
  order: OrderValidators,
}

export * from './menuItem'
export * from './order'
