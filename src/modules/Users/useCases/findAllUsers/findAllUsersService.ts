import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { User } from "../../entities/User";
import errors from "errors";

@injectable()
export class FindAllUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(limit: number, offset: number): Promise<User[]> {
    const user = await this.usersRepository.findAll(limit, offset);
    if (!user) throw errors.notFoundError();
    return user;
  }
}
