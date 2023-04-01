import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import errors from "errors";
import { Address } from "modules/Users/entities/Address";

@injectable()
export class AddAddressUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: Address): Promise<void> {
    if (!data) throw errors.conflictError("Body is required");
    
    const user = this.usersRepository.findById(id);
    if (!user) throw errors.notFoundError();

    await this.usersRepository.addNewAddress(id, data);
  }
}
