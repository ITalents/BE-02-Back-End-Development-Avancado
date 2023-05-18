import { NotFoundError } from "@/helpers/errors/apiErrors";
import { Order } from "@/modules/Orders/entities/Order";
import { IOrderRepository } from "@/modules/Orders/repositories/IOrderRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(limit: number, offset: number): Promise<Order[]> {
    const orders = await this.orderRepository.findAll(limit, offset);
    if (!orders) throw new NotFoundError("Carts not found!");
    return orders;
  }
}
