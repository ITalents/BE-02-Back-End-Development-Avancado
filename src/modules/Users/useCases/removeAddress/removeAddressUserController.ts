import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveAddressUserService } from "./removeAddressUserService";

export class RemoveAddressUserController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    try {
      const removeAddressUserService = container.resolve(
        RemoveAddressUserService
      );
      await removeAddressUserService.execute(id, body);
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
