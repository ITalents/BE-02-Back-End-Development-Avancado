import { Product } from "../entities/Product";

export interface IProductRepository {
  create(data: Product): Promise<void>;
  findAll(limit: number, offset: number): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: Product): Promise<void>;
  remove(id: string): Promise<void>;
}