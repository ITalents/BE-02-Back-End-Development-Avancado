import errors from "errors";
import { NextFunction, Request, Response } from "express";

interface IQueryParams {
  limit: number;
  offset: number;
}

export async function paginationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let { limit, offset } = req.query;

  limit ? Number(limit) : 10;
  offset ? Number(offset) : 0;

  res.locals.limit = limit;
  res.locals.offset = offset;

  next();
}
