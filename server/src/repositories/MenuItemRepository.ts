import { PrismaClientSingleton } from '@database'
import { MenuItem, MenuItemInfo } from '@entities'
import { convertToMenuItem } from './utils'

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

  async create(payload: MenuItemInfo): Promise<MenuItem> {
    const itemDB = await this.prisma.item.create({
      data: payload,
      include: this.includeAll,
    })
    const item = convertToMenuItem(itemDB)
    return item
  }

  async search(
    filter?: Partial<MenuItemInfo>,
    name?: string
  ): Promise<MenuItem[]> {
    const itemsDB = await this.prisma.item.findMany({
      where: {
        ...filter,
        name: name
          ? {
              contains: name,
              mode: 'insensitive',
            }
          : undefined,
      },
      include: this.includeAll,
    })
    const items = itemsDB.map((itemDB) => convertToMenuItem(itemDB))
    return items
  }

  async findById(id: number): Promise<MenuItem | null> {
    const itemDB = await this.prisma.item.findUnique({
      where: { id },
      include: this.includeAll,
    })
    if (itemDB === null) return null
    const item = convertToMenuItem(itemDB)
    return item
  }
}
