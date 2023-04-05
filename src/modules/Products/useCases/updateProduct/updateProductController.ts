import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductService } from "./updateProductService";

class UpdateProductController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { _id } = res.locals.user;
    const data = req.body;
    const updateProductService = container.resolve(UpdateProductService);
    await updateProductService.execute(_id, data);
    return res.sendStatus(204);
  }
}

export default new UpdateProductController();
