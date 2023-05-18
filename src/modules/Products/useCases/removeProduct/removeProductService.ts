import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { IProductRepository } from "@/modules/Products/repositories/IProductRepository";

@injectable()
export class RemoveProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError("Product not found");
    await this.productRepository.remove(id);
  }
}
