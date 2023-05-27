import jwt from "jsonwebtoken";
import { IAuthRepository } from "../IAuthRepositories";
import "dotenv/config";
import { User } from "@/modules/Users/entities/User";
import UserSchema from "@/modules/Users/schemas/UserSchema";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import axios from "axios";
import { IParamsGithubToken } from "../../interfaces/ParamsGithubToken";
import queryString from "query-string";
import { UsersRepository } from "@/modules/Users/repositories/implementations/UsersRepository";
import { CreateUserService } from "@/modules/Users/useCases/createUser/createUserService";
import { IUserGihtub } from "@/modules/Users/schemas/UserSchemaGithub";

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string): Promise<User> {
    const user = await UserSchema.findOne({ email }).select("password");
    return user!;
  }

  generateToken(userId: ObjectId): string {
    const secret = process.env.SECRET as string;
    return jwt.sign({ id: userId }, secret, { expiresIn: 86400 });
  }

  async getTokenGitHub(
    urlGithubAccessToken: string,
    params: IParamsGithubToken
  ): Promise<string | (string | null)[] | null> {
    const { data } = await axios.post(urlGithubAccessToken, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const parseData = queryString.parse(data);
    const token = parseData.access_token;
    return token;
  }

  async findUserGitHub(token: string): Promise<IUserGihtub> {
    const response = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async createUserByGitHub(
    userGithub: IUserGihtub,
    userEmail: string
  ): Promise<User> {
    const usersRepository = new UsersRepository();
    const createUsersService = new CreateUserService(usersRepository);

    const newUser: User = {
      name: userGithub.name,
      email: userEmail,
      password: String(userGithub.id),
      image: userGithub.avatar_url,
      addresses: [],
      favorite_products: [],
      admin: false,
      created_at: new Date(),
    };

    await createUsersService.execute(newUser);
    const user = await this.findUserByEmail(newUser.email);

    return user;
  }
}
