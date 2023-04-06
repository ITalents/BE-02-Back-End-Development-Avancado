import { Order } from "modules/Orders/entities/Order";
import { IOrderRepository } from "modules/Orders/repositories/IOrderRepository";
import { ObjectId } from "mongodb";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(_id: ObjectId, data: Order): Promise<void> {
    const order = { ...data, user_id: _id } as Order;
    await this.orderRepository.create(order);
  }
}
