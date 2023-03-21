import { ICreateUser } from "modules/Users/dtos/ICreateUser";
import { IUsersRepository } from "modules/Users/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { Users } from "@prisma/client";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(body: Users): Promise<void> {
    const passHash = await hash(body.password, 10);

    const userExists = await this.usersRepository.findByEmail(body.email);
    if (userExists) throw new Error("User already exists!");

    await this.usersRepository.create({ ...body, password: passHash });
  }
}
