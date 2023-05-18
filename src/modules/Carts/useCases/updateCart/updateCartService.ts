import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { ICartRepository } from "@/modules/Carts/repositories/ICartRepository";
import { Cart } from "@/modules/Carts/entities/Cart";

@injectable()
export class UpdateCartService {
  constructor(
    @inject("CartRepository")
    private cartRepository: ICartRepository
  ) {}

  async execute(id: string, data: Cart): Promise<void> {
    const cart = await this.cartRepository.findById(id);
    if (!cart) throw new NotFoundError("Category not found!");
    await this.cartRepository.update(id, data);
  }
}
