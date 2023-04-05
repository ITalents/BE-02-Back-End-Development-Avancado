import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveProductService } from "./removeProductService";

class RemoveProductController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const updateProductService = container.resolve(RemoveProductService);
    await updateProductService.execute(id);
    return res.sendStatus(204);
  }
}

export default new RemoveProductController();
