import { inject, injectable } from "tsyringe";
import { User } from "@/modules/Users/entities/User";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { IUsersRepository } from "@/modules/Users/repositories/IUsersRepository";

@injectable()
export class FindUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundError("User not found!");

    return user;
  }
}
