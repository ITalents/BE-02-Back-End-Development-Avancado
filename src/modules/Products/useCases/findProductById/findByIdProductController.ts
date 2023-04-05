import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdProductService } from "./findByIdProductService";

class FindByIdProductController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const findByIdProductService = container.resolve(FindByIdProductService);
    const user = await findByIdProductService.execute(id);
    return res.send(user);
  }
}

export default new FindByIdProductController();
