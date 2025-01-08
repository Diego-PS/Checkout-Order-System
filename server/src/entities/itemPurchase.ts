import { MenuItem } from './menuItem'

export type ItemPurchase = {
  id: number
  item: MenuItem
  quantity: number
  order_id: number
  item_value: number
  total_value: number
}

export type ItemPurchaseInfo = {
  item_id: number
  price: number
  quantity: number
}
