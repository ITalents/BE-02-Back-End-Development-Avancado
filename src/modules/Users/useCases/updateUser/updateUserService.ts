import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import errors from "errors";

@injectable()
export class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: User): Promise<void> {
    if (!data) throw errors.conflictError("Body is required");
    const user = this.usersRepository.findById(id);
    if (!user) throw errors.notFoundError();
    await this.usersRepository.updateUser(id, data);
  }
}
