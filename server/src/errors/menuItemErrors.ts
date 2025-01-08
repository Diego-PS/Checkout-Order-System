import { Enums } from '@enums'
import { BadRequestError } from '@errors'

export class MenuItemNotFound extends BadRequestError {
  constructor(message?: string) {
    super(Enums.ErrorType.MenuItem.MENU_ITEM_NOT_FOUND, message)
  }
}
