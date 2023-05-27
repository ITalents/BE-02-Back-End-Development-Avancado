import { IUserGihtub } from "@/modules/Users/schemas/UserSchemaGithub";
import { User } from "modules/Users/entities/User";
import { ObjectId } from "mongodb";
import { IParamsGithubToken } from "../interfaces/ParamsGithubToken";

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<User>;
  generateToken(userId: ObjectId): string;
  getTokenGitHub(
    urlGithubAccessToken: string,
    params: IParamsGithubToken
  ): Promise<string | (string | null)[] | null>;
  createUserByGitHub(userGithub: IUserGihtub, userEmail: string): Promise<User>;
  findUserGitHub(token: string): Promise<IUserGihtub>;
}
