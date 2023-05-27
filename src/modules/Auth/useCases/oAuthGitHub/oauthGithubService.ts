import { inject, injectable } from "tsyringe";
import { IAuthRepository } from "@/modules/Auth/repositories/IAuthRepositories";
import { IParamsGithubToken } from "../../interfaces/ParamsGithubToken";
import { ObjectId } from "mongodb";

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

    const gitHubToken = await this.authRepository.getTokenGitHub(
      urlGithubAccessToken,
      params
    );
    const userGithub = await this.authRepository.findUserGitHub(
      String(gitHubToken)
    );

    const userEmail = userGithub.email ?? `${userGithub.login}@github.com`;
    const user = await this.authRepository.findUserByEmail(userEmail);

    let userId = user?._id ?? new ObjectId();

    if (!user) {
      const newUser = await this.authRepository.createUserByGitHub(
        userGithub,
        userEmail
      );
      userId = newUser._id!;
    }
    const token = this.authRepository.generateToken(userId);

    return token;
  }
}
