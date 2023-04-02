import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddAddressUserService } from "./addAddressUserService";

class AddAddressUserController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const user = res.locals.user;
    const body = req.body;
    const addAddressUserService = container.resolve(AddAddressUserService);
    await addAddressUserService.execute(user._id, body);
    return res.sendStatus(201);
  }
}
export default new AddAddressUserController();
