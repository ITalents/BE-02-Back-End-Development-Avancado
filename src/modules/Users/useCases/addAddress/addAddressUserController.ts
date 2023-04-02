import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddAddressUserService } from "./addAddressUserService";

class AddAddressUserController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    const addAddressUserService = container.resolve(AddAddressUserService);
    await addAddressUserService.execute(id, body);
    return res.sendStatus(201);
  }
}
export default new AddAddressUserController();
