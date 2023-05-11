import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductService } from "./createProductService";

class CreateProductController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const body = req.body;
    const image = req.file?.path as string;
    const data = { ...body, image };
    const createProductService = container.resolve(CreateProductService);
    await createProductService.execute(data);
    return res.sendStatus(201);
  }
}

export default new CreateProductController();
