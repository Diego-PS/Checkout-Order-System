import { config } from '@config'
import { MenuItem } from '@entities'

export const searchItems = async (
  categoryId?: number,
  name?: string
): Promise<MenuItem[]> => {
  let url = `${config.apiUrl}/item/?`
  if (categoryId) url += `&categoryId=${categoryId}`
  if (name) url += `&name=${name}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: { items: MenuItem[] } = await response.json()

  return data.items
}
