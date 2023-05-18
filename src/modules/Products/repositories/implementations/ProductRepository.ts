import { Product } from "@/modules/Products/entities/Product";
import ProductSchema from "@/modules/Products/schemas/ProductSchema";
import { IProductRepository } from "../IProductRepository";

export class ProductRepository implements IProductRepository {
  async create(data: Product): Promise<void> {
    await ProductSchema.create(data);
  }

  async findByName(name: string): Promise<Product | null> {
    return await ProductSchema.findOne({ name });
  }
  async findByBarCode(barcode: number): Promise<Product | null> {
    return await ProductSchema.findOne({ bar_code: barcode });
  }

  async findAll(limit: number, offset: number): Promise<Product[]> {
    return ProductSchema.find().limit(limit).skip(offset);
  }

  async findById(id: string): Promise<Product | null> {
    const user = await ProductSchema.findById(id);
    return user;
  }

  async update(id: string, data: Product): Promise<void> {
    await ProductSchema.updateOne({ _id: id }, { $set: data });
  }

  async remove(id: string): Promise<void> {
    await ProductSchema.findByIdAndRemove(id);
  }

  async addCategory(productId: string, categoryId: string): Promise<void> {
    await ProductSchema.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $push: {
          categories: {
            _id: categoryId,
          },
        },
      }
    );
  }
  async removeCategory(productId: string, categoryId: string): Promise<void> {
    await ProductSchema.findOneAndUpdate(
      {
        _id: productId,
      },
      {
        $pull: {
          categories: {
            _id: categoryId,
          },
        },
      }
    );
  }
}
