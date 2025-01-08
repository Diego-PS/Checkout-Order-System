import { MenuItem } from '@entities'
import { Enums } from '@enums'
import { validateRequest } from '@middlewares'
import { SearchItemsUseCase } from '@usecases'
import { IsNumberString, IsOptional, IsString } from 'class-validator'
import { Request, Response } from 'express'

export class SearchItemsQueryDto {
  @IsOptional()
  @IsNumberString()
  categoryId?: string

  @IsOptional()
  @IsString()
  name?: string
}

export class SearchItemsResponseDto {
  items!: MenuItem[]
}

export const saerchItemsValidator = validateRequest(
  undefined,
  undefined,
  SearchItemsQueryDto
)

export const searchItems = async (
  req: Request<unknown, unknown, unknown, SearchItemsQueryDto>,
  res: Response<SearchItemsResponseDto>
) => {
  const categoryId = req.query.categoryId
    ? parseInt(req.query.categoryId)
    : undefined
  const searchItemsUseCase = new SearchItemsUseCase()
  const items = await searchItemsUseCase.execute(categoryId, req.query.name)
  return res.status(Enums.HttpStatusCode.Success.OK).send({ items })
}
