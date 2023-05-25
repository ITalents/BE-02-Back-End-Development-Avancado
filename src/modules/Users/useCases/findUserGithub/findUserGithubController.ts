import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserGithubServices } from "./findUserGithubServices";

class FindUserGithubController {
  async handle(req: Request, res: Response): Promise<Response | undefined> {
    const token = res.locals.token;
    const findUserGithubServices = container.resolve(FindUserGithubServices);
    const user = await findUserGithubServices.execute(token);
    return res.send(user);
  }
}

export default new FindUserGithubController();
