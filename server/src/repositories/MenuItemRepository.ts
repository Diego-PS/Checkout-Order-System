import { PrismaClientSingleton } from '@database'
import { MenuItem, MenuItemInfo } from '@entities'
import { removeAttributes } from '@utils'

type ItemDB = {
  image: {
    id: string
    url: string
  }
  category: {
    image: {
      id: string
      url: string
    }
  } & {
    id: number
    name: string
    image_id: string
  }
} & {
  id: number
  name: string
  price: number
  category_id: number
  image_id: string
}

export class MenuItemRepository {
  private prisma = PrismaClientSingleton.getPrismaClient()
  private includeAll = {
    image: true,
    category: {
      include: {
        image: true,
      },
    },
  }
  private convertToMenuItem(itemDB: ItemDB): MenuItem {
    const category = removeAttributes(itemDB.category, 'image_id')
    const item = {
      ...removeAttributes(itemDB, 'category_id', 'image_id'),
      category,
    }
    return item
  }

  async create(payload: MenuItemInfo): Promise<MenuItem> {
    const itemDB = await this.prisma.item.create({
      data: payload,
      include: this.includeAll,
    })
    const item = this.convertToMenuItem(itemDB)
    return item
  }

  async searchByName(name?: string): Promise<MenuItem[]> {
    const itemsDB = await this.prisma.item.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: this.includeAll,
    })
    const items = itemsDB.map((itemDB) => this.convertToMenuItem(itemDB))
    return items
  }
}
