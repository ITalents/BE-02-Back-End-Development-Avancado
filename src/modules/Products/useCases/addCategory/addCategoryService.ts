import { inject, injectable } from "tsyringe";
import { NotFoundError } from "helpers/errors/apiErrors";
import { IProductRepository } from "modules/Products/repositories/IProductRepository";
import { ICategoriesRepository } from "modules/Categories/repositories/ICategoriesRepository";

@injectable()
export class AddCategoryService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository,
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(productId: string, categoryId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);
    if (!product) throw new NotFoundError("Product not found!");

    const category = await this.categoriesRepository.findById(categoryId);
    if (!category) throw new NotFoundError("Category not found!");

    await this.productRepository.addCategory(productId, categoryId);
  }
}
