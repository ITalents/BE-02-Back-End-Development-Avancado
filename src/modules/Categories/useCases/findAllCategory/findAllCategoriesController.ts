import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllCategoriesService } from "./findAllCategoriesService";

class FindAllCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const limit = res.locals.limit;
    const offset = res.locals.offset;

    const findAllCategoriesService = container.resolve(
      FindAllCategoriesService
    );
    const category = await findAllCategoriesService.execute(limit, offset);
    return res.send(category);
  }
}

export default new FindAllCategoriesController();
