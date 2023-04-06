import { Cart } from "modules/Carts/entities/Cart";
import { ICartRepository } from "modules/Carts/repositories/ICartRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCartService {
  constructor(
    @inject("CartRepository")
    private cartRepository: ICartRepository
  ) {}

  async execute(data: Cart): Promise<void> {
    await this.cartRepository.create(data);
  }
}
