import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllOrderService } from "./findAllOrderService";

class FindAllOrderController {
  async handle(req: Request, res: Response): Promise<Response> {
    const limit = res.locals.limit;
    const offset = res.locals.offset;

    const findAllOrderService = container.resolve(FindAllOrderService);
    const carts = await findAllOrderService.execute(limit, offset);
    return res.send(carts);
  }
}

export default new FindAllOrderController();
