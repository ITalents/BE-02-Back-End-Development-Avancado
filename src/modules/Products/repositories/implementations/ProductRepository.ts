import { Product } from "modules/Products/entities/Product";
import ProductSchema from "modules/Products/schemas/ProductSchema";
import { IProductRepository } from "../IProductRepository";

export class ProductRepository implements IProductRepository {
  async create(data: Product): Promise<void> {
    await ProductSchema.create(data);
  }

  async findAll(limit: number, offset: number): Promise<Product[]> {
    return ProductSchema.find().limit(limit).skip(offset);
  }

  async findById(id: string): Promise<Product | null> {
    const user = await ProductSchema.findById(id);
    return user;
  }

  async update(id: string, data: Product): Promise<void> {
    await ProductSchema.findByIdAndUpdate(id, data);
  }

  async remove(id: string): Promise<void> {
    await ProductSchema.findByIdAndRemove(id);
  }
}
