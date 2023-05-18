import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { User } from "../../entities/User";
import { ConflictError } from "@/helpers/errors/apiErrors";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(body: User): Promise<void> {
    const passHash = bcrypt.hashSync(body.password, 10);
    const userExists = await this.usersRepository.findByEmail(body.email);
    if (userExists) throw new ConflictError("Email already exists");

    await this.usersRepository.createUser({
      ...body,
      password: passHash,
    });
  }
}
