import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AddFavoriteProductService } from "./addFavoriteProductService";

export class AddFavoriteProductController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    try {
      const addFavoriteProductService = container.resolve(
        AddFavoriteProductService
      );
      await addFavoriteProductService.execute(id, body);
      return res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
}
