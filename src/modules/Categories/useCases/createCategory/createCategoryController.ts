import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryService } from "./createCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const body = req.body;
    const creatCategoryService = container.resolve(CreateCategoryService);
    await creatCategoryService.execute(body);
    return res.sendStatus(201);
  }
}

export default new CreateCategoryController();
