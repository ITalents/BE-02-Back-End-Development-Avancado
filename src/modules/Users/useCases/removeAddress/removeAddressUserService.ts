import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { Address } from "modules/Users/entities/Address";
import { ConflictError, NotFoundError } from "helpers/errors/apiErrors";

@injectable()
export class RemoveAddressUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(addressId: string, userId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const address = await this.usersRepository.findAddressById(addressId, userId);
    if (!address) throw new NotFoundError("Address not found!");

    await this.usersRepository.removeAddress(addressId, userId);
  }
}
