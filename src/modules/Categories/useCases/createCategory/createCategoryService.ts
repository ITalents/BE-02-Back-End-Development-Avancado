import { ConflictError } from "helpers/errors/apiErrors";
import { Category } from "modules/Categories/entities/Category";
import { ICategoriesRepository } from "modules/Categories/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(data: Category): Promise<void> {
    const categoryExists = await this.categoriesRepository.findByName(
      data.name
    );
    if (categoryExists) throw new ConflictError("Category already exists");

    await this.categoriesRepository.createCategory(data);
  }
}
