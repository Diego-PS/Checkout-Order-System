import { PaymentStatus } from '@enums'

export type Payment = {
  id: number
  buyer: string
  code: string
  status: PaymentStatus
  value: number
}
