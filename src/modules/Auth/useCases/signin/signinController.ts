import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { SigninService } from "./signinService";

export class SigninController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | NextFunction | undefined> {
    const body = req.body;
    try {
      const signinService = container.resolve(SigninService);
      const token = await signinService.execute(body);
      return res.send({ token });
    } catch (err) {
      next(err);
    }
  }
}
