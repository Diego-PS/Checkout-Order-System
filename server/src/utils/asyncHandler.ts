import { NextFunction, Request, Response } from 'express'

export const asyncHandler =
  <ReqType = Request, ResType = Response>(
    fn: (req: ReqType, res: ResType, next: NextFunction) => Promise<unknown>
  ) =>
  async (req: ReqType, res: ResType, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
