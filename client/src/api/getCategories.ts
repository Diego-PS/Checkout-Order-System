import { config } from '@config'
import { MenuItemCategory } from '@entities'

export const getCategories = async (): Promise<MenuItemCategory[]> => {
  const response = await fetch(`${config.apiUrl}/category/`)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data: { categories: MenuItemCategory[] } = await response.json()

  return data.categories
}
