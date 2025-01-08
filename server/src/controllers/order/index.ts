import { submitOrder, submitOrderValidator } from './submitOrder'

export const OrderController = {
  submit: submitOrder,
}

export const OrderValidators = {
  submit: submitOrderValidator,
}

export * from './submitOrder'
