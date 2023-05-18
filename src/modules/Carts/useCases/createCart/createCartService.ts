import { Cart } from "@/modules/Carts/entities/Cart";
import { ICartRepository } from "@/modules/Carts/repositories/ICartRepository";
import { ObjectId } from "mongodb";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCartService {
  constructor(
    @inject("CartRepository")
    private cartRepository: ICartRepository
  ) {}

  async execute(_id: ObjectId, data: Cart): Promise<void> {
    const cart = { ...data, user_id: _id } as Cart;
    await this.cartRepository.create(cart);
  }
}
