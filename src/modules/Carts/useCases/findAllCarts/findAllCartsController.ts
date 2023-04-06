import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllCartService } from "./findAllCartsService";

class FindAllCartController {
  async handle(req: Request, res: Response): Promise<Response> {
    const limit = res.locals.limit;
    const offset = res.locals.offset;

    const findAllCartService = container.resolve(FindAllCartService);
    const carts = await findAllCartService.execute(limit, offset);
    return res.send(carts);
  }
}

export default new FindAllCartController();
