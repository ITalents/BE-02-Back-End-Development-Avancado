import { inject, injectable } from "tsyringe";
import { ConflictError, NotFoundError } from "helpers/errors/apiErrors";
import { ICategoriesRepository } from "modules/Categories/repositories/ICategoriesRepository";
import { Category } from "modules/Categories/entities/Category";

@injectable()
export class UpdateCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string, data: Category): Promise<void> {
    if (!data) throw new ConflictError("Body is required");
    const category = await this.categoriesRepository.findById(id);
    if (!category) throw new NotFoundError("Category not found!");
    await this.categoriesRepository.updateCategory(id, data);
  }
}
