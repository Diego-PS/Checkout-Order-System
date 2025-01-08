import { Enums } from '@enums'
import { validateRequest } from '@middlewares'
import { SubmitOrderUseCase } from '@usecases'
import { Type } from 'class-transformer'
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator'
import { Request, Response } from 'express'

class ItemPurchaseInfoDto {
  @IsInt()
  @Min(1)
  item_id!: number

  @IsInt()
  @Min(1)
  quantity!: number
}

export class SubmitOrderBodyDto {
  @IsString()
  buyer!: string

  @IsArray()
  @ValidateNested({ always: true, each: true })
  @Type(() => ItemPurchaseInfoDto)
  purchases!: ItemPurchaseInfoDto[]
}

export const submitOrderValidator = validateRequest(SubmitOrderBodyDto)

export const submitOrder = async (
  req: Request<unknown, unknown, SubmitOrderBodyDto>,
  res: Response
) => {
  const submitOrderUseCase = new SubmitOrderUseCase()
  await submitOrderUseCase.execute(req.body)
  return res.status(Enums.HttpStatusCode.Success.OK).send()
}
