import { IProductRepository } from "../../repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "helpers/errors/apiErrors";
import { Product } from "modules/Products/entities/Product";

@injectable()
export class UpdateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(id: string, data: Product): Promise<void> {
    const user = await this.productRepository.findById(id);
    if (!user) throw new NotFoundError("User not found");

    await this.productRepository.update(id, data);
  }
}
