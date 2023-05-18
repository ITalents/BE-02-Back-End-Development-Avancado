import { NotFoundError } from "@/helpers/errors/apiErrors";
import { Cart } from "@/modules/Carts/entities/Cart";
import { ICartRepository } from "@/modules/Carts/repositories/ICartRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllCartService {
  constructor(
    @inject("CartRepository")
    private cartRepository: ICartRepository
  ) {}

  async execute(limit: number, offset: number): Promise<Cart[]> {
    const carts = await this.cartRepository.findAll(limit, offset);
    if (!carts) throw new NotFoundError("Carts not found!");
    return carts;
  }
}
