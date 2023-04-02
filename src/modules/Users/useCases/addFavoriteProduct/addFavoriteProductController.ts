import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddFavoriteProductService } from "./addFavoriteProductService";

class AddFavoriteProductController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    const addFavoriteProductService = container.resolve(
      AddFavoriteProductService
    );
    await addFavoriteProductService.execute(id, body);
    return res.sendStatus(201);
  }
}

export default new AddFavoriteProductController();
