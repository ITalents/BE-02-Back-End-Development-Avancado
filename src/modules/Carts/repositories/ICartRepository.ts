import { Cart } from "../entities/Cart";

export interface ICartRepository {
  create(data: Cart): Promise<void>;
  findAll(limit: number, offset: number): Promise<Cart[]>;
  findById(id: string): Promise<Cart | null>;
  update(id: string, data: Cart): Promise<void>;
  remove(id: string): Promise<void>;
}
