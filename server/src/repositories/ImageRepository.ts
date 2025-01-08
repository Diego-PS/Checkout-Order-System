import { config } from '@config'
import { PrismaClientSingleton } from '@database'
import { Image } from '@entities'

export class ImageRepository {
  private prisma = PrismaClientSingleton.getPrismaClient()

  async create(imageId: string, fileExtension: string): Promise<Image> {
    const url = `${config.baseUrl}/${imageId}.${fileExtension}`
    const image = await this.prisma.image.create({ data: { id: imageId, url } })
    return image
  }
}
