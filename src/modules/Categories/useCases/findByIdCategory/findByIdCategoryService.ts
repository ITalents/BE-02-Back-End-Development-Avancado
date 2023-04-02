import { inject, injectable } from "tsyringe";
import { NotFoundError } from "helpers/errors/apiErrors";
import { Category } from "modules/Categories/entities/Category";
import { ICategoriesRepository } from "modules/Categories/repositories/ICategoriesRepository";

@injectable()
export class FindByIdCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) throw new NotFoundError("User not found!");
    return category;
  }
}
