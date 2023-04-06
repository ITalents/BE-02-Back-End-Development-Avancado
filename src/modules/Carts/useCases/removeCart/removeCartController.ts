import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveCartService } from "./removeCartService";

class RemoveCartController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const updateCartService = container.resolve(RemoveCartService);
    await updateCartService.execute(id);
    return res.sendStatus(204);
  }
}

export default new RemoveCartController();
