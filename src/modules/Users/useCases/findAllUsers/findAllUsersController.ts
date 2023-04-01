import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllUsersService } from "./findAllUsersService";

export class FindAllUsersController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | NextFunction | undefined> {
    const limit = res.locals.limit;
    const offset = res.locals.offset;
    try {
      const findAllUserService = container.resolve(FindAllUsersService);
      const user = await findAllUserService.execute(limit, offset);
      return res.send(user);
    } catch (err) {
      next(err);
    }
  }
}
