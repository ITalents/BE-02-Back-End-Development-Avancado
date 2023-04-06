import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarService } from "./updateUserAvatarService";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { _id } = res.locals.user;
    const avatar = req.file?.filename as string;
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    await updateUserAvatarService.execute(_id, avatar);
    return res.sendStatus(204);
  }
}

export default new UpdateUserAvatarController();
