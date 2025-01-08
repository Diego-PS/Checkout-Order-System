import { $Enums } from '@prisma/client'

export type ItemDB = {
  image: {
    id: string
    url: string
  }
  category: {
    image: {
      id: string
      url: string
    }
  } & {
    id: number
    name: string
    image_id: string
  }
} & {
  id: number
  name: string
  price: number
  category_id: number
  image_id: string
}

/*
model ItemPurchase {
  id          Int   @id @default(autoincrement())
  item_id     Int
  item        Item  @relation(fields: [item_id], references: [id])
  quantity    Int
  order_id    Int
  order       Order @relation(fields: [order_id], references: [id])
  item_value  Float
  total_value Float

  @@map("item_purchases")
}

model Order {
  id         Int            @id @default(autoincrement())
  payment_id Int            @unique()
  payment    Payment        @relation(fields: [payment_id], references: [id])
  status     OrderStatus    @default(PENDING)
  purchases  ItemPurchase[]

  @@map("orders")
}
*/

export type OrderDB = {
  id: number
  payment: {
    id: number
    status: $Enums.PaymentStatus
    buyer: string
    code: string
    value: number
  }
  purchases: {
    id: number
    item: ItemDB
    item_id: number
    quantity: number
    order_id: number
    item_value: number
    total_value: number
  }[]
  payment_id: number
  status: $Enums.OrderStatus
}
