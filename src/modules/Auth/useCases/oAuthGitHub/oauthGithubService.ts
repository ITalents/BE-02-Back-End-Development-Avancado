import { inject, injectable } from "tsyringe";
import { IAuthRepository } from "@/modules/Auth/repositories/IAuthRepositories";
import axios from "axios";
import qs from "query-string";
import { IParamsGithubToken } from "../../interfaces/ParamsGithubToken";

@injectable()
export class OauthGithubService {
  constructor(
    @inject("AuthRepository")
    private authRepository: IAuthRepository
  ) {}

  async execute(code: string): Promise<string | (string | null)[] | null> {
    const params: IParamsGithubToken = {
      client_id: process.env.CLIENT_ID as string,
      redirect_uri: process.env.REDIRECT_URI as string,
      client_secret: process.env.CLIENT_SECRET as string,
      code: code,
      grant_type: "authorization_code",
    };

    const urlGithubAccessToken = process.env.GITHUB_ACCESS_TOKEN_URL as string;

    const token = this.authRepository.getTokenGitHub(
      urlGithubAccessToken,
      params
    );

    return token;
  }
}
