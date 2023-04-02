import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdCategoryService } from "./findByIdCategoryService";

class FindByIdCategoryController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    const findByIdCategoryService = container.resolve(FindByIdCategoryService);
    const user = await findByIdCategoryService.execute(id);
    return res.send(user);
  }
}

export default new FindByIdCategoryController();
