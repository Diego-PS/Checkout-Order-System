import { MenuItemCategory } from '@entities'
import { Enums } from '@enums'
import { GetCategoriesUseCase } from '@usecases'
import { Request, Response } from 'express'

export class GetCategoriesResponseDto {
  categories!: MenuItemCategory[]
}

export const getCategories = async (
  _req: Request,
  res: Response<GetCategoriesResponseDto>
) => {
  const getCategoriesUseCase = new GetCategoriesUseCase()
  const categories = await getCategoriesUseCase.execute()
  return res.status(Enums.HttpStatusCode.Success.OK).send({ categories })
}
