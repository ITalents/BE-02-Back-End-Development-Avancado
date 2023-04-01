import { Products } from "../../Products/entities/Product";
import { Address } from "../entities/Address";
import { User } from "../entities/User";

export interface IUsersRepository {
  createUser(data: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  updateUser(id: string, data: User): Promise<void>;
  removeUser(id: string): Promise<void>;
  addNewAddress(userId: string, address: Address): Promise<void>;
  removeAddress(userId: string, address: Address): Promise<void>;
  addNewFavoriteProduct(userId: string, produc: Products): Promise<void>;
  removeFavoriteProduct(userId: string, produc: Products): Promise<void>;
}
