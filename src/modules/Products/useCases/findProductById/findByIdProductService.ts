import { IProductRepository } from "../../repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { Product } from "@/modules/Products/entities/Product";

@injectable()
export class FindByIdProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError("Product not found!");
    return product;
  }
}
