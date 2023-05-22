import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveUserService } from "./removeUserService";

class RemoveUserController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { _id } = res.locals.user;
    const updateUserService = container.resolve(RemoveUserService);
    await updateUserService.execute(_id);
    return res.sendStatus(204);
  }
}

export default new RemoveUserController();
