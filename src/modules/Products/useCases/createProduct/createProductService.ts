import { inject, injectable } from "tsyringe";
import { ConflictError } from "@/helpers/errors/apiErrors";
import { Product } from "@/modules/Products/entities/Product";
import { IProductRepository } from "@/modules/Products/repositories/IProductRepository";

@injectable()
export class CreateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(body: Product): Promise<void> {
    const productNameExists = await this.productRepository.findByName(
      body.name
    );
    if (productNameExists !== null) throw new ConflictError("Product already exists!");

    const productBarCodeExists = await this.productRepository.findByBarCode(
      body.bar_code
    );
    if (productBarCodeExists)
      throw new ConflictError("Product already exists!");

    await this.productRepository.create(body);
  }
}
