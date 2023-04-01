import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import errors from "errors";
import { Product } from "modules/Products/entities/Product";

@injectable()
export class AddFavoriteProductService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, data: Product): Promise<void> {
    if (!data) throw errors.conflictError("Body is required");

    const user = this.usersRepository.findById(id);
    if (!user) throw errors.notFoundError();

    await this.usersRepository.addNewFavoriteProduct(id, data);
  }
}
