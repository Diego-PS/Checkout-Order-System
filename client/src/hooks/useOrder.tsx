import { MenuItem, OrderClient } from '@entities'
import { useState } from 'react'

export const useOrder = () => {
  const myOrderKey = 'order'

  const getOrder = (): OrderClient => {
    const jsonOrder = localStorage.getItem(myOrderKey)
    const order: OrderClient = jsonOrder
      ? (JSON.parse(jsonOrder) as OrderClient)
      : { value: 0, items: {} }
    return order
  }

  const [order, setOrderSatate] = useState<OrderClient>(getOrder())

  const setOrder = (order: OrderClient) => {
    localStorage.setItem(myOrderKey, JSON.stringify(order))
    setOrderSatate(order)
  }

  const addItem = (item: MenuItem) => {
    const localOrder = getOrder()
    if (localOrder.items[item.id] !== undefined) {
      localOrder.items[item.id]!.quantity += 1
      localOrder.value += item.price
    } else {
      localOrder.items[item.id] = { item, quantity: 1 }
      localOrder.value += item.price
    }
    setOrder(localOrder)
  }

  const removeItem = (id: number) => {
    const localOrder = getOrder()
    if (!localOrder.items[id]) {
      throw new Error(`Item with ${id} is not included in the order`)
    }
    localOrder.items[id].quantity -= 1
    localOrder.value -= localOrder.items[id].item.price
    if (localOrder.items[id].quantity === 0) {
      localOrder.items[id] = undefined
    }
    setOrder(localOrder)
  }

  return {
    order,
    addItem,
    removeItem,
  }
}
