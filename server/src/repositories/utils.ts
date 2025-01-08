import { MenuItem, Order } from '@entities'
import { ItemDB, OrderDB } from './types'
import { removeAttributes } from '@utils'

export const convertToMenuItem = (itemDB: ItemDB): MenuItem => {
  const category = removeAttributes(itemDB.category, 'image_id')
  const item = {
    ...removeAttributes(itemDB, 'category_id', 'image_id'),
    category,
  }
  return item
}

export const convertToOrder = (orderDB: OrderDB): Order => {
  const purchases = orderDB.purchases.map((purchase) => ({
    ...removeAttributes(purchase, 'item_id'),
    item: convertToMenuItem(purchase.item),
  }))
  const order = {
    ...removeAttributes(orderDB, 'payment_id'),
    purchases,
  }
  return order
}
