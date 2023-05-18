import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { IProductRepository } from "@/modules/Products/repositories/IProductRepository";
import { Product } from "@/modules/Products/entities/Product";

@injectable()
export class FindAllProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(limit: number, offset: number): Promise<Product[]> {
    const products = await this.productRepository.findAll(limit, offset);
    if (!products.length) throw new NotFoundError("Products not found!");
    return products;
  }
}
