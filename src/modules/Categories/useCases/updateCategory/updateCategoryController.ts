import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCategoryService } from "./updateCategoryService";

class UpdateCategoryController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const body = req.body;
    const updateCategoryService = container.resolve(UpdateCategoryService);
    await updateCategoryService.execute(id, body);
    return res.sendStatus(204);
  }
}

export default new UpdateCategoryController();
