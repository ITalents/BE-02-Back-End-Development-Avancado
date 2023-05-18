import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { NotFoundError } from "@/helpers/errors/apiErrors";

import bcrypt from "bcrypt";

@injectable()
export class UpdateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: User): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundError("User not found");
    if (data.password) {
      const hashPassword = await bcrypt.hash(data.password, 10);

      await this.usersRepository.updateUser(id, {
        ...data,
        password: hashPassword,
      });
    } else {
      await this.usersRepository.updateUser(id, data);
    }
  }
}
