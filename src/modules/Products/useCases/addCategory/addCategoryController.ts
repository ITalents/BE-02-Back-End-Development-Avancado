import { Request, Response } from "express";
import { container } from "tsyringe";
import { AddCategoryService } from "./addCategoryService";

class AddCategoryController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { categoryId, productId } = req.params;
    const addCategoryService = container.resolve(AddCategoryService);
    await addCategoryService.execute(productId, categoryId);
    return res.sendStatus(201);
  }
}

export default new AddCategoryController();
