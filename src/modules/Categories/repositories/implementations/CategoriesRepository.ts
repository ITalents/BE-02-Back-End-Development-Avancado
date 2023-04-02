import { Category } from "modules/Categories/entities/Category";
import CategorySchema from "../../schemas/CategorySchema";
import { ICategoriesRepository } from "../ICategoriesRepository";

export class CategoriesRepository implements ICategoriesRepository {
  async createCategory(data: Category): Promise<void> {
    await CategorySchema.create(data);
  }
  async findAll(limit: number, offset: number): Promise<Category[]> {
    return await CategorySchema.find().limit(limit).skip(offset);
  }
  async findById(id: string): Promise<Category | null> {
    const category = await CategorySchema.findById(id);
    return category;
  }
  async findByName(name: string): Promise<Category | null> {
    const category = await CategorySchema.findOne({ name });
    return category;
  }
  async updateCategory(id: string, data: Category): Promise<void> {
    await CategorySchema.findByIdAndUpdate(id, data);
  }
  async removeCategory(id: string): Promise<void> {
    await CategorySchema.findByIdAndRemove(id);
  }
}
