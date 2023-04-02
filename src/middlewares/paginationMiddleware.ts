import { NextFunction, Request, Response } from "express";
import { ApiError } from "helpers/errors/apiErrors";

class paginationMiddleware {
  handle(
    err: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(err)
    try {
      let { limit, offset } = req.query;

      limit ? Number(limit) : 10;
      offset ? Number(offset) : 0;

      res.locals.limit = limit;
      res.locals.offset = offset;

      return next();
    } catch (err) {
      return next(err);
    }
  }
}

export default new paginationMiddleware();
