import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveFavoriteProductService } from "./removeFavoriteProductService";

class RemoveFavoriteProductController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;

    const removeFavoriteProductService = container.resolve(
      RemoveFavoriteProductService
    );
    await removeFavoriteProductService.execute(id, body);
    return res.sendStatus(204);
  }
}

export default new RemoveFavoriteProductController();
