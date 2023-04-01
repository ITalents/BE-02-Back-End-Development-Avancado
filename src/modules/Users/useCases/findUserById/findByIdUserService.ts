import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { User } from "../../entities/User";
import errors from "errors";

@injectable()
export class FindByIdUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw errors.notFoundError();
    return user;
  }
}
