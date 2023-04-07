import { inject, injectable } from "tsyringe";
import { User } from "@/modules/Users/entities/User";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { IUsersRepository } from "@/modules/Users/repositories/IUsersRepository";
import { dirname, join, resolve } from "path";

@injectable()
export class FindUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(_id: string): Promise<User> {
    let user = await this.usersRepository.findById(_id);
    if (!user) throw new NotFoundError("User not found!");

    return user;
  }
}
