import { Products } from "../../../Products/entities/Product";
import { Address } from "../../entities/Address";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";
import connection from "../../../../database";
import UserSchema from "../../schemas/UserSchema";

export class UsersRepository implements IUsersRepository {
  async createUser(data: User): Promise<void> {
    UserSchema.create(data);
  }

  findByEmail(email: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  updateUser(id: string, data: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeUser(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addNewAddress(userId: string, address: Address): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeAddress(userId: string, address: Address): Promise<void> {
    throw new Error("Method not implemented.");
  }
  addNewFavoriteProduct(userId: string, produc: Products): Promise<void> {
    throw new Error("Method not implemented.");
  }
  removeFavoriteProduct(userId: string, produc: Products): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
