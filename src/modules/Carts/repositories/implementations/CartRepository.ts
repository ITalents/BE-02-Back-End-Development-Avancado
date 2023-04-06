import { Cart } from "modules/Carts/entities/Cart";
import CartSchema from "modules/Carts/schemas/CartSchema";
import { ICartRepository } from "../ICartRepository";

export class CartRepository implements ICartRepository {
  async create(data: Cart): Promise<void> {
    await CartSchema.create(data);
  }
  async findAll(limit: number, offset: number): Promise<Cart[]> {
    return await CartSchema.find().limit(limit).skip(offset);
  }
  async findById(id: string): Promise<Cart | null> {
    return await CartSchema.findById(id);
  }
  async update(id: string, data: Cart): Promise<void> {
    await CartSchema.updateOne({ _id: id }, { $set: data });
  }
  async remove(id: string): Promise<void> {
    await CartSchema.deleteOne({ _id: id });
  }
}
