import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateStatusOrderService } from "./updateStatusOrderService";

class UpdateStatusOrderController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const { id } = req.params;
    const updateStatusOrderService = container.resolve(
      UpdateStatusOrderService
    );
    await updateStatusOrderService.execute(id);
    return res.sendStatus(204);
  }
}

export default new UpdateStatusOrderController();
