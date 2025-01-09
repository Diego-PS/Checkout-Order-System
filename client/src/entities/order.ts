import { OrderStatus } from '@enums'
import { Payment } from './payment'
import { ItemInOrder, ItemPurchase, ItemPurchaseInfo } from './itemPurchase'

export type Order = {
  id: number
  payment: Payment
  status: OrderStatus
  purchases: ItemPurchase[]
}

export type OrderInfo = {
  buyer: string
  purchases: ItemPurchaseInfo[]
}

export type OrderInfoWithoutPrices = {
  buyer: string
  purchases: Omit<ItemPurchaseInfo, 'price'>[]
}

export type OrderClient = {
  value: number
  items: Record<number, ItemInOrder | undefined>
}
