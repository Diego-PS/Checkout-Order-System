import { MenuItemCategoryInfo, MenuItemInfo } from '@entities'
import {
  ImageRepository,
  MenuItemCategoryRepository,
  MenuItemRepository,
} from '@repositories'
import fs from 'node:fs'
import path from 'node:path'

export class Seeder {
  private async loadMenu(filePath: string) {
    try {
      const data = await fs.promises.readFile(filePath, 'utf-8')
      const parsedData = JSON.parse(data)
      const categories: MenuItemCategoryInfo[] = parsedData.categories
      const items: MenuItemInfo[] = parsedData.items
      return { categories, items }
    } catch (error) {
      console.error(`Error reading or parseing the file ${filePath}`, error)
      throw error
    }
  }

  private async createImages(imageIds: string[]) {
    try {
      const imageRepository = new ImageRepository()
      const imagePromises = imageIds.map((imageId) =>
        imageRepository.create(imageId, 'jpg')
      )
      const images = await Promise.all(imagePromises)
      return images
    } catch (error) {
      console.error('Error when creating images in the database', error)
      throw error
    }
  }

  private async createCategories(categoriyInfos: MenuItemCategoryInfo[]) {
    try {
      const categoryRepository = new MenuItemCategoryRepository()
      const categoryPromises = categoriyInfos.map((category) =>
        categoryRepository.create(category)
      )
      const categories = await Promise.all(categoryPromises)
      return categories
    } catch (error) {
      console.error('Error when creating categories in the database', error)
      throw error
    }
  }

  private async createItems(itemInfos: MenuItemInfo[]) {
    try {
      const itemRepository = new MenuItemRepository()
      const itemsPromises = itemInfos.map((item) => itemRepository.create(item))
      const items = await Promise.all(itemsPromises)
      return items
    } catch (error) {
      console.error('Error when creating items in the database', error)
      throw error
    }
  }

  async seed() {
    const { categories, items } = await this.loadMenu(
      path.resolve('src/data/menu.json')
    )
    const imageIds = [
      ...categories.map((category) => category.image_id),
      ...items.map((item) => item.image_id),
    ]
    await this.createImages(imageIds)
    console.log('Created images')
    await this.createCategories(categories)
    console.log('Created categories')
    await this.createItems(items)
    console.log('Created items')
  }
}
