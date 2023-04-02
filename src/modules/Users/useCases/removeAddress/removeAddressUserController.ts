import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveAddressUserService } from "./removeAddressUserService";

class RemoveAddressUserController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    const removeAddressUserService = container.resolve(
      RemoveAddressUserService
    );
    await removeAddressUserService.execute(id, body);
    return res.sendStatus(204);
  }
}

export default new RemoveAddressUserController();
