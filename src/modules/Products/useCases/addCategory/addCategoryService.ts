import { inject, injectable } from "tsyringe";
import { NotFoundError } from "helpers/errors/apiErrors";
import { IProductRepository } from "modules/Products/repositories/IProductRepository";

@injectable()
export class AddCategoryService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(userId: string, categoryId: string): Promise<void> {
    const product = await this.productRepository.findById(userId);
    if (!product) throw new NotFoundError("Product not found!");

    await this.productRepository.addCategory(userId, categoryId);
  }
}
