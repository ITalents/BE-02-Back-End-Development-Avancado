import { Address } from "../../entities/Address";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import UserSchema from "../../schemas/UserSchema";

export class UsersRepository implements IUsersRepository {
  async createUser(data: User): Promise<void> {
    await UserSchema.create(data);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserSchema.findOne({ email });
    return user;
  }

  async findAll(limit: number, offset: number): Promise<User[]> {
    return UserSchema.find()
      .limit(limit)
      .skip(offset)
      .select(["-password", "-__v"]);
  }

  async findById(id: string): Promise<User | null> {
    const user = await UserSchema.findById(id).select(["-password", "-__v"]);
    return user;
  }

  async updateUser(id: string, data: User): Promise<void> {
    await UserSchema.updateOne({ _id: id }, { $set: data });
  }

  async removeUser(id: string): Promise<void> {
    await UserSchema.deleteOne({ _id: id });
  }

  async addNewAddress(userId: string, address: Address): Promise<void> {
    await UserSchema.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          addresses: address,
        },
      }
    );
  }

  async findAddressById(
    addressId: string,
    userId: string
  ): Promise<Address | null> {
    return await UserSchema.findOne(
      { _id: userId, "addresses._id": addressId },
      { "addresses.$": 1 }
    );
  }

  async removeAddress(addressId: string, userId: string): Promise<void> {
    await UserSchema.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          addresses: {
            _id: addressId,
          },
        },
      }
    );
  }

  async addNewFavoriteProduct(
    userId: string,
    productId: string
  ): Promise<void> {
    await UserSchema.updateOne(
      {
        _id: userId,
      },
      {
        $push: {
          favorite_products: {
            _id: productId,
          },
        },
      }
    );
  }

  async findFavoriteProductById(
    productId: string,
    userId: string
  ): Promise<Address | null> {
    return await UserSchema.findOne(
      { _id: userId, "favorite_products._id": productId },
      { "favorite_products.$": 1 }
    );
  }

  async removeFavoriteProduct(
    userId: string,
    productId: string
  ): Promise<void> {
    await UserSchema.updateOne(
      {
        _id: userId,
      },
      {
        $pull: {
          favorite_products: {
            _id: productId,
          },
        },
      }
    );
  }

  async updateAvatar(id: string, avatar: string): Promise<void> {
    await UserSchema.updateOne({ _id: id }, { $set: { image: avatar } });
  }
}
