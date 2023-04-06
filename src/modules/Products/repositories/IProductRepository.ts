import { Product } from "../entities/Product";

export interface IProductRepository {
  create(data: Product): Promise<void>;
  findByName(name: string): Promise<Product | null>;
  findByBarCode(barcode: number): Promise<Product | null>;
  findAll(limit: number, offset: number): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: Product): Promise<void>;
  remove(id: string): Promise<void>;
  addCategory(productId: string, categoryId: string): Promise<void>;
  removeCategory(productId: string, categoryId: string): Promise<void>;
}
