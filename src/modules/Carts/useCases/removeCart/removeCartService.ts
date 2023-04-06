import { inject, injectable } from "tsyringe";
import { NotFoundError } from "helpers/errors/apiErrors";
import { ICartRepository } from "modules/Carts/repositories/ICartRepository";

@injectable()
export class RemoveCartService {
  constructor(
    @inject("CartRepository")
    private cartRepository: ICartRepository
  ) {}

  async execute(id: string): Promise<void> {
    const cart = await this.cartRepository.findById(id);
    if (!cart) throw new NotFoundError("Cart not found");
    await this.cartRepository.remove(id);
  }
}
