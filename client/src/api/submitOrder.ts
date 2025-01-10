import { config } from '@config'
import { OrderInfoWithoutPrices } from '@entities'

export const submitOrder = async (
  order: OrderInfoWithoutPrices
): Promise<boolean> => {
  const response = await fetch(`${config.apiUrl}/order/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })

  return response.ok
}
