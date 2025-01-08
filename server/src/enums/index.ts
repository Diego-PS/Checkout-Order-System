import { ErrorTypeEnums } from './errorTypes'
import { HttpStatusCodeEnums } from './httpSatusCodes'
import { OrderStatusEnum } from './orderStatus'
import { PaymentStatusEnum } from './paymentStatus'

export * from './errorTypes'
export * from './httpSatusCodes'
export * from './orderStatus'
export * from './paymentStatus'

export const Enums = {
  ErrorType: ErrorTypeEnums,
  HttpStatusCode: HttpStatusCodeEnums,
  OrderStatus: OrderStatusEnum,
  PaymentStatus: PaymentStatusEnum,
}
