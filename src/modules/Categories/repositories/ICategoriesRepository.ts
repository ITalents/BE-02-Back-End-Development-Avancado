import { Category } from "../entities/Category";

export interface ICategoriesRepository {
  createCategory(data: Category): Promise<void>;
  findAll(limit: number, offset: number): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  findByName(name: string): Promise<Category | null>;
  updateCategory(id: string, data: Category): Promise<void>;
  removeCategory(id: string): Promise<void>;
}
