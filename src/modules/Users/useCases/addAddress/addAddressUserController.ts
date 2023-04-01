import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddAddressUserService } from "./addAddressUserService";

export class AddAddressUserController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    try {
      const addAddressUserService = container.resolve(AddAddressUserService);
      await addAddressUserService.execute(id, body);
      return res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
}
