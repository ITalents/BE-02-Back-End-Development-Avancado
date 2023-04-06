import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddFavoriteProductService } from "./addFavoriteProductService";

class AddFavoriteProductController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { _id } = res.locals.user;
    const { productId } = req.params;
    const addFavoriteProductService = container.resolve(
      AddFavoriteProductService
    );
    await addFavoriteProductService.execute(_id, productId);
    return res.sendStatus(201);
  }
}

export default new AddFavoriteProductController();
