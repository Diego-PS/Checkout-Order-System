import { MenuItemCategory } from '@entities'
import { MenuItemCategoryRepository } from '@repositories'

export class GetCategoriesUseCase {
  private categoryRepository = new MenuItemCategoryRepository()

  async execute(): Promise<MenuItemCategory[]> {
    const categories = await this.categoryRepository.get()
    return categories
  }
}
