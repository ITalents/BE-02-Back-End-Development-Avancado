import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";

@injectable()
export class RemoveUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundError("User not found");
    await this.usersRepository.removeUser(id);
  }
}
