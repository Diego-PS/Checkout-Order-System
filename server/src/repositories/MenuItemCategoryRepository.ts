import { PrismaClientSingleton } from '@database'
import { MenuItemCategory, MenuItemCategoryInfo } from '@entities'
import { removeAttributes } from '@utils'

export class MenuItemCategoryRepository {
  private prisma = PrismaClientSingleton.getPrismaClient()

  async create(payload: MenuItemCategoryInfo): Promise<MenuItemCategory> {
    const categoryDB = await this.prisma.category.create({
      data: payload,
      include: {
        image: true,
      },
    })

    const category = removeAttributes(categoryDB, 'image_id')

    return category
  }
}
