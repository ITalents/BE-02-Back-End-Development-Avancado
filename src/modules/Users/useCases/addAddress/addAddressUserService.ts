import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { Address } from "modules/Users/entities/Address";
import { ConflictError, NotFoundError } from "helpers/errors/apiErrors";

@injectable()
export class AddAddressUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: Address): Promise<void> {
    if (!data) throw new ConflictError("Body is required");

    const user = this.usersRepository.findById(id);
    if (!user) throw new NotFoundError("User not found!");

    await this.usersRepository.addNewAddress(id, data);
  }
}
