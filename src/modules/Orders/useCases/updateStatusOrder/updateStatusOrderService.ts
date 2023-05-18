import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { IOrderRepository } from "@/modules/Orders/repositories/IOrderRepository";

@injectable()
export class UpdateStatusOrderService {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new NotFoundError("Order not found!");
    await this.orderRepository.updateStatus(id, order.concluded);
  }
}
