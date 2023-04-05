import { inject, injectable } from "tsyringe";
import { ConflictError } from "helpers/errors/apiErrors";
import { Product } from "modules/Products/entities/Product";
import { IProductRepository } from "modules/Products/repositories/IProductRepository";

@injectable()
export class CreateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(body: Product): Promise<void> {
    await this.productRepository.create(body);
  }
}
