import {
  ItemPurchaseInfo,
  Order,
  OrderInfo,
  OrderInfoWithoutPrices,
} from '@entities'
import { MenuItemNotFound } from '@errors'
import { MenuItemRepository, OrderRepository } from '@repositories'

export class SubmitOrderUseCase {
  private orderRepository = new OrderRepository()
  private menuItemRepository = new MenuItemRepository()

  private async converToPurchaseInfo(
    purchaseInfoWithoutPrice: Omit<ItemPurchaseInfo, 'price'>
  ): Promise<ItemPurchaseInfo> {
    const itemId = purchaseInfoWithoutPrice.item_id
    const item = await this.menuItemRepository.findById(itemId)
    if (item === null)
      throw new MenuItemNotFound(
        `Item with id ${itemId} does not exist in the database`
      )
    return { ...purchaseInfoWithoutPrice, price: item.price }
  }

  private async convertToOrderInfo(
    orderInfoWithoutPrices: OrderInfoWithoutPrices
  ): Promise<OrderInfo> {
    const purchaseInfoPromises = orderInfoWithoutPrices.purchases.map(
      (purchase) => this.converToPurchaseInfo(purchase)
    )
    const purchases = await Promise.all(purchaseInfoPromises)
    return { ...orderInfoWithoutPrices, purchases }
  }

  async execute(
    orderInfoWithoutPrices: OrderInfoWithoutPrices
  ): Promise<Order> {
    const orderInfo = await this.convertToOrderInfo(orderInfoWithoutPrices)
    const order = await this.orderRepository.create(orderInfo)
    return order
  }
}
