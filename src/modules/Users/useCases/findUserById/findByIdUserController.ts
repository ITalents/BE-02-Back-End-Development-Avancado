import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdUserService } from "./findByIdUserService";

class FindByIdUserController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const { _id } = res.locals.user;
    const userId = id === "null" ? _id : id;

    const findByIdUserService = container.resolve(FindByIdUserService);
    const user = await findByIdUserService.execute(userId);
    return res.send(user);
  }
}

export default new FindByIdUserController();
