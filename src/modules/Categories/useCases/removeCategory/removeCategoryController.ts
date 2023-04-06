import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveCategoryService } from "./removeCategoryService";

class RemoveCategoryController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params;
    const updateCategoryService = container.resolve(RemoveCategoryService);
    await updateCategoryService.execute(id);
    return res.sendStatus(204);
  }
}

export default new RemoveCategoryController();
