import { inject, injectable } from "tsyringe";
import { NotFoundError } from "helpers/errors/apiErrors";
import { ICategoriesRepository } from "modules/Categories/repositories/ICategoriesRepository";

@injectable()
export class RemoveCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id);
    if (!category) throw new NotFoundError("Category not found");
    await this.categoriesRepository.removeCategory(id);
  }
}
