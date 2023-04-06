import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdOrderService } from "./findByIdOrderService";

class FindByIdOrderController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const findByIdOrderService = container.resolve(FindByIdOrderService);
    const user = await findByIdOrderService.execute(id);
    return res.send(user);
  }
}

export default new FindByIdOrderController();
