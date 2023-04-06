import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCartService } from "./updateCartService";

class UpdateCartController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const body = req.body;
    const updateCartService = container.resolve(UpdateCartService);
    await updateCartService.execute(id, body);
    return res.sendStatus(204);
  }
}

export default new UpdateCartController();
