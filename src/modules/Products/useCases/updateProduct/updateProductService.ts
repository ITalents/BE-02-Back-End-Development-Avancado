import { IProductRepository } from "../../repositories/IProductRepository";
import { inject, injectable } from "tsyringe";
import { ConflictError, NotFoundError } from "@/helpers/errors/apiErrors";
import { Product } from "@/modules/Products/entities/Product";

@injectable()
export class UpdateProductService {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(id: string, data: Product): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError("Product not found");

    const productNameExists = await this.productRepository.findByName(
      data.name
    );
    if (productNameExists) throw new ConflictError("Product already exists!");

    const productBarCodeExists = await this.productRepository.findByBarCode(
      data.bar_code
    );
    if (productBarCodeExists)
      throw new ConflictError("Product already exists!");

    await this.productRepository.update(id, data);
  }
}
