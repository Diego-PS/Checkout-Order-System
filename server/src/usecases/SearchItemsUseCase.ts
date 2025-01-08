import { MenuItem } from '@entities'
import { MenuItemRepository } from '@repositories'

export class SearchItemsUseCase {
  private menuItemRepository = new MenuItemRepository()

  async execute(category_id?: number, name?: string): Promise<MenuItem[]> {
    const items = await this.menuItemRepository.search({ category_id }, name)
    return items
  }
}
