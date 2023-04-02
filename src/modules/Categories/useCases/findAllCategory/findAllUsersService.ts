import { NotFoundError } from "helpers/errors/apiErrors";
import { Category } from "modules/Categories/entities/Category";
import { ICategoriesRepository } from "modules/Categories/repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindAllCategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(limit: number, offset: number): Promise<Category[]> {
    const user = await this.categoriesRepository.findAll(limit, offset);
    if (!user) throw new NotFoundError("User not found!");
    return user;
  }
}
