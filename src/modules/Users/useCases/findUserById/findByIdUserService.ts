import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { User } from "../../entities/User";
import { NotFoundError } from "helpers/errors/apiErrors";

@injectable()
export class FindByIdUserService {
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
