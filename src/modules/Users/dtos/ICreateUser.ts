import { Addresses, Carts, Orders, Products } from "@prisma/client";

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  addresses?: Addresses[];
  favorite_products?: Products[];
  orders?: Orders[];
  carts?: Carts[];
  admin?: boolean;
}
