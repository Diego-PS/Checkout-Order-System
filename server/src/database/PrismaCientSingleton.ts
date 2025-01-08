import { PrismaClient } from '@prisma/client'

export class PrismaClientSingleton {
  private static prisma: PrismaClient | null = null

  private constructor() {}

  static getPrismaClient() {
    if (this.prisma === null) this.prisma = new PrismaClient()
    return this.prisma
  }
}
