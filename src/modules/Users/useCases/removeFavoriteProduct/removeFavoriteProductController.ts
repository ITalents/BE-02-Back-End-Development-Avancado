import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveFavoriteProductService } from "./removeFavoriteProductService";

export class RemoveFavoriteProductController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    try {
      const removeFavoriteProductService = container.resolve(
        RemoveFavoriteProductService
      );
      await removeFavoriteProductService.execute(id, body);
      return res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
