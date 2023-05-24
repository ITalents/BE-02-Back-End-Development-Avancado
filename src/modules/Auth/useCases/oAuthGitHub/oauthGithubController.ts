import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { OauthGithubService } from "./oauthGithubService";

class OauthGithubController {
  async handle(
    req: Request,
    res: Response
  ): Promise<Response | NextFunction | undefined> {
    const { code } = req.body;
    const oauthGithubService = container.resolve(OauthGithubService);
    const token = await oauthGithubService.execute(code);
    return res.send({ token });
  }
}

export default new OauthGithubController();
