import { Product } from "../../Products/entities/Product";
import { Address } from "../entities/Address";
import { User } from "../entities/User";
import { IUserGihtub } from "../schemas/UserSchemaGithub";

export interface IUsersRepository {
  createUser(data: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findAll(limit: number, offset: number): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  updateUser(id: string, data: User): Promise<void>;
  removeUser(id: string): Promise<void>;
  addNewAddress(userId: string, address: Address): Promise<void>;
  findAddressById(addressId: string, userId: string): Promise<Address | null>;
  removeAddress(addressId: string, userId: string): Promise<void>;
  addNewFavoriteProduct(userId: string, productId: string): Promise<void>;
  findFavoriteProductById(
    productId: string,
    userId: string
  ): Promise<Address | null>;
  removeFavoriteProduct(userId: string, productId: string): Promise<void>;
  updateAvatar(id: string, avatar: string): Promise<void>;
  findUserGitHub(token: string): Promise<IUserGihtub>;
}
