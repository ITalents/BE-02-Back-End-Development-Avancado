import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdCartService } from "./findByIdCartService";

class FindByIdCartController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const findByIdCartService = container.resolve(FindByIdCartService);
    const user = await findByIdCartService.execute(id);
    return res.send(user);
  }
}

export default new FindByIdCartController();
