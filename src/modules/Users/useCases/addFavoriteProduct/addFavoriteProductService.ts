import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { Product } from "modules/Products/entities/Product";
import { ConflictError, NotFoundError } from "helpers/errors/apiErrors";

@injectable()
export class AddFavoriteProductService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: Product): Promise<void> {
    if (!data) throw new ConflictError("Body is required");

    const user = this.usersRepository.findById(id);
    if (!user) throw new NotFoundError("User not found!");

    await this.usersRepository.addNewFavoriteProduct(id, data);
  }
}
