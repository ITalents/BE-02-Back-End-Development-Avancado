import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { IUserGihtub } from "../../schemas/UserSchemaGithub";

@injectable()
export class FindUserGithubServices {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(token: string): Promise<IUserGihtub> {
    const user = await this.usersRepository.findUserGitHub(token);
    if (!user) throw new NotFoundError("User not found!");
    return user;
  }
}
