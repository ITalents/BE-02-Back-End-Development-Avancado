import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveUserService } from "./removeUserService";

export class RemoveUserController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    try {
      const updateUserService = container.resolve(RemoveUserService);
      await updateUserService.execute(id);
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
