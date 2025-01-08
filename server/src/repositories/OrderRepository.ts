import { PrismaClientSingleton } from '@database'
import { Order, OrderInfo } from '@entities'
import { Enums } from '@enums'
import crypto from 'node:crypto'
import { convertToOrder } from './utils'

export class OrderRepository {
  private prisma = PrismaClientSingleton.getPrismaClient()
  private includeAll = {
    payment: true,
    purchases: {
      include: {
        item: {
          include: {
            category: {
              include: {
                image: true,
              },
            },
            image: true,
          },
        },
      },
    },
  }

  async create(payload: OrderInfo): Promise<Order> {
    const purchases = payload.purchases.map((purchase) => ({
      item_id: purchase.item_id,
      quantity: purchase.quantity,
      item_value: purchase.price,
      total_value: purchase.price * purchase.quantity,
    }))
    const total = purchases.reduce((acc, purchase) => {
      acc += purchase.total_value
      return acc
    }, 0)

    const orderDB = await this.prisma.order.create({
      data: {
        payment: {
          create: {
            buyer: payload.buyer,
            code: crypto.randomBytes(4).toString('hex').toUpperCase(),
            status: Enums.PaymentStatus.PENDING,
            value: total,
          },
        },
        purchases: {
          createMany: {
            data: purchases,
          },
        },
      },
      include: this.includeAll,
    })

    const order = convertToOrder(orderDB)

    return order
  }
}
