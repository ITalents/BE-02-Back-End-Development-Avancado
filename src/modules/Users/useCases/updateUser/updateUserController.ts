import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserService } from "./updateUserService";

class UpdateUserController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    const updateUserService = container.resolve(UpdateUserService);
    await updateUserService.execute(id, body);
    return res.sendStatus(204);
  }
}

export default new UpdateUserController();