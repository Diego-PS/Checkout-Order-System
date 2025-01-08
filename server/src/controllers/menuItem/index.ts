import { saerchItemsValidator, searchItems } from './searchItems'

export const MenuItemController = {
  search: searchItems,
}

export const MenuItemValidators = {
  search: saerchItemsValidator,
}

export * from './searchItems'
