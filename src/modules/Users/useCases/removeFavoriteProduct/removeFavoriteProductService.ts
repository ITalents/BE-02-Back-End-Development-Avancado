import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { Product } from "modules/Products/entities/Product";
import { ConflictError, NotFoundError } from "helpers/errors/apiErrors";

@injectable()
export class RemoveFavoriteProductService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(userId: string, productId: string): Promise<void> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const product = await this.usersRepository.findFavoriteProductById(
      productId,
      userId
    );
    if (!product) throw new NotFoundError("Product not found!");

    await this.usersRepository.removeFavoriteProduct(userId, productId);
  }
}
