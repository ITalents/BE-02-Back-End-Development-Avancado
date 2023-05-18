import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { IOrderRepository } from "@/modules/Orders/repositories/IOrderRepository";
import { Order } from "../../entities/Order";

@injectable()
export class FindByIdOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundError("Order not found!");
    return order;
  }
}
