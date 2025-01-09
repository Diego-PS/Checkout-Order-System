import { Image } from './image'

export type MenuItemCategory = {
  id: number
  name: string
  image: Image
}

export type MenuItemCategoryInfo = Omit<MenuItemCategory, 'image'> & {
  image_id: string
}
