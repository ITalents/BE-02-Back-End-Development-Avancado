import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserService } from "./updateUserService";

export class UpdateUserController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    try {
      const updateUserService = container.resolve(UpdateUserService);
      await updateUserService.execute(id, body);
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
