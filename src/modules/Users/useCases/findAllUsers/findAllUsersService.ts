import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { User } from "../../entities/User";
import { NotFoundError } from "@/helpers/errors/apiErrors";

@injectable()
export class FindAllUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(limit: number, offset: number): Promise<User[]> {
    const user = await this.usersRepository.findAll(limit, offset);
    return user;
  }
}
