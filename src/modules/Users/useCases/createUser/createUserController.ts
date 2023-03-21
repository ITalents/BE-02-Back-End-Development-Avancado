import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserService } from "./createUserService";

export class createUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const body = req.body;
    try {
      const createUserService = container.resolve(CreateUserService)
      
      return res.sendStatus(201);
    } catch (err: any) {
      return res.status(500).send(err.messsage);
    }
  }
}
