import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import errors from "errors";

@injectable()
export class RemoveUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = this.usersRepository.findById(id);
    if (!user) throw errors.notFoundError();
    await this.usersRepository.removeUser(id);
  }
}
