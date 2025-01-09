import { getCategories } from './getCategories'
import { getHelloMessage } from './getHelloMessage'
import { searchItems } from './searchItems'

export const api = {
  getHelloMessage,
  getCategories,
  searchItems,
}

export * from './getHelloMessage'
export * from './getCategories'
export * from './searchItems'
