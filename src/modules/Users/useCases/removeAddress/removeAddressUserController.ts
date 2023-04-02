import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveAddressUserService } from "./removeAddressUserService";

class RemoveAddressUserController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { idAddress } = req.params;
    const user = res.locals.user;
    const removeAddressUserService = container.resolve(
      RemoveAddressUserService
    );
    await removeAddressUserService.execute(idAddress, user._id);
    return res.sendStatus(204);
  }
}

export default new RemoveAddressUserController();
