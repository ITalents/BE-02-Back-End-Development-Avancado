import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserAvatarService } from "./findfindUserAvatarService";

class FindMyDataController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const findUserAvatarService = container.resolve(FindUserAvatarService);
    const user = await findUserAvatarService.execute(id);
    return res.sendFile(user.image);
  }
}

export default new FindMyDataController();
