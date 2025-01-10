import { getCategories } from './getCategories'
import { getHelloMessage } from './getHelloMessage'
import { searchItems } from './searchItems'
import { submitOrder } from './submitOrder'

export const api = {
  getHelloMessage,
  getCategories,
  searchItems,
  submitOrder,
}

export * from './getHelloMessage'
export * from './getCategories'
export * from './searchItems'
export * from './submitOrder'
