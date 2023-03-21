import { Users, Addresses, Products } from "@prisma/client";
import { prisma } from "config/database.connection";
import { ICreateUser } from "modules/Users/dtos/ICreateUser";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async create(data: Users): Promise<void> {
    await prisma.users.create({
      data: data,
    });
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await prisma.users.findUnique({ where: { email: email } });
    if (!user) throw new Error("User not found");
    return user;
  }

  async findAll(): Promise<Users[]> {
    return await prisma.users.findMany();
  }

  async findById(id: string): Promise<Users> {
    const user = await prisma.users.findUnique({ where: { id: id } });
    if (!user) throw new Error("User not found");
    return user;
  }

  async update(id: string, data: Users): Promise<void> {
    await prisma.users.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: string): Promise<void> {
    await prisma.users.delete({
      where: {
        id: id,
      },
    });
  }

  async addNewAddress(userId: string, address: Addresses): Promise<void> {
    await prisma.users.update({
      where: { id: userId },
      data: {
        addresses: {
          set: address,
        },
      },
    });
  }
  async removeAddress(userId: string, address: Addresses): Promise<void> {
    await prisma.users.update({
      where: { id: userId },
      data: {
        addresses: {
          set: address,
        },
      },
    });
  }
  async addNewFavoriteProduct(
    userId: string,
    product: Products
  ): Promise<void> {
    await prisma.users.update({
      where: { id: userId },
      data: {
        favorite_products: {
          set: product,
        },
      },
    });
  }
  async removeFavoriteProduct(
    userId: string,
    product: Products
  ): Promise<void> {
    await prisma.users.update({
      where: { id: userId },
      data: {
        favorite_products: {
          set: product,
        },
      },
    });
  }
}
