import { inject, injectable } from "tsyringe";
import { NotFoundError } from "helpers/errors/apiErrors";
import { Cart } from "modules/Carts/entities/Cart";
import { IOrderRepository } from "modules/Orders/repositories/IOrderRepository";

@injectable()
export class FindByIdOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(id: string): Promise<Cart> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundError("Order not found!");
    return order;
  }
}
