import { Product } from "../../../Products/entities/Product";
import { Address } from "../../entities/Address";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import UserSchema from "../../schemas/UserSchema";
import { NotFoundError } from "helpers/errors/apiErrors";

export class UsersRepository implements IUsersRepository {
  async createUser(data: User): Promise<void> {
    await UserSchema.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserSchema.findOne({ email });
    return user;
  }

  async findAll(limit: number, offset: number): Promise<User[]> {
    return UserSchema.find().limit(limit).skip(offset);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserSchema.findById(id);
    return user;
  }

  async updateUser(id: string, data: User): Promise<void> {
    await UserSchema.findByIdAndUpdate(id, data, { returnDocument: "after" });
  }

  async removeUser(id: string): Promise<void> {
    await UserSchema.findByIdAndRemove(id);
  }

  async addNewAddress(userId: string, address: Address): Promise<void> {
    await UserSchema.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          addresses: address,
        },
      },
      {
        rawResult: true,
      }
    );
  }

  async removeAddress(userId: string, address: Address): Promise<void> {
    await UserSchema.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          addresses: {
            _id: address._id,
          },
        },
      },
      {
        rawResult: true,
      }
    );
  }

  async addNewFavoriteProduct(userId: string, produc: Product): Promise<void> {
    await UserSchema.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          favorite_products: {
            _id: produc._id,
          },
        },
      },
      {
        rawResult: true,
      }
    );
  }

  async removeFavoriteProduct(userId: string, produc: Product): Promise<void> {
    await UserSchema.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: {
          favorite_products: {
            _id: produc._id,
          },
        },
      },
      {
        rawResult: true,
      }
    );
  }
}
