import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveCategoryService } from "./removeCategoryService";

class RemoveCategoryController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { categoryId, productId } = req.params;
    const removeCategoryService = container.resolve(RemoveCategoryService);
    await removeCategoryService.execute(productId, categoryId);
    return res.sendStatus(204);
  }
}

export default new RemoveCategoryController();
