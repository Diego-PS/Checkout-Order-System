import { MenuItemCategory } from './menuItemCategory'
import { Image } from './image'

export type MenuItem = {
  id: number
  name: string
  price: number
  category: MenuItemCategory
  image: Image
}

export type MenuItemInfo = Omit<MenuItem, 'category' | 'image'> & {
  category_id: number
  image_id: string
}
