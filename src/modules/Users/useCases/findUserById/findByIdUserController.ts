import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdUserService } from "./findByIdUserService";

export class FindByIdUserController {
  async handle(req: Request,res: Response,next: NextFunction): Promise<Response | NextFunction | undefined> {
    const { id } = req.params;
    try {
      const findByIdUserService = container.resolve(FindByIdUserService);
      const user = await findByIdUserService.execute(id);
      return res.send(user);
    } catch (err) {
      next(err);
    }
  }
}
