import { Order } from "@/modules/Orders/entities/Order";
import OrderSchema from "@/modules/Orders/schemas/OrderSchema";
import { IOrderRepository } from "../IOrderRepository";

export class OrderRepository implements IOrderRepository {
  async create(data: Order): Promise<void> {
    await OrderSchema.create(data);
  }
  async findAll(limit: number, offset: number): Promise<Order[]> {
    return await OrderSchema.find().limit(limit).skip(offset);
  }
  async findById(id: string): Promise<Order | null> {
    return await OrderSchema.findById(id);
  }
  async updateStatus(id: string, concluded: boolean): Promise<void> {
    await OrderSchema.updateOne(
      { _id: id },
      { $set: { concluded: !concluded } }
    );
  }
  async remove(id: string): Promise<void> {
    await OrderSchema.deleteOne({ _id: id });
  }
}
