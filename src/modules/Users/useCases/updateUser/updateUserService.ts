import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { ConflictError, NotFoundError } from "helpers/errors/apiErrors";

@injectable()
export class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: User): Promise<void> {
    if (!data) throw new ConflictError("Body is required");
    const user = this.usersRepository.findById(id);
    if (!user) throw new NotFoundError("User not found!");
    await this.usersRepository.updateUser(id, data);
  }
}
