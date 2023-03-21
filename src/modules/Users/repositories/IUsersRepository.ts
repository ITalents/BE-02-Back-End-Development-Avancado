import { Users, Products, Addresses } from "@prisma/client";
import { ICreateUser } from "../dtos/ICreateUser";

export interface IUsersRepository {
  create(data: Users): Promise<void>;
  findByEmail(email: string): Promise<Users>;
  findAll(): Promise<Users[]>;
  findById(id: string): Promise<Users>;
  update(id: string, data: Users): Promise<void>;
  remove(id: string): Promise<void>;
  addNewAddress(userId: string, address: Addresses): Promise<void>;
  removeAddress(userId: string, address: Addresses): Promise<void>;
  addNewFavoriteProduct(userId: string, produc: Products): Promise<void>;
  removeFavoriteProduct(userId: string, produc: Products): Promise<void>;
}
