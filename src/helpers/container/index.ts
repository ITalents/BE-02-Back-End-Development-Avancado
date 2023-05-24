
import { IAuthRepository } from "@/modules/Auth/repositories/IAuthRepositories";
import { AuthRepository } from "@/modules/Auth/repositories/implementations/AuthRepositories";
import { ICartRepository } from "@/modules/Carts/repositories/ICartRepository";
import { CartRepository } from "@/modules/Carts/repositories/implementations/CartRepository";
import { ICategoriesRepository } from "@/modules/Categories/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@/modules/Categories/repositories/implementations/CategoriesRepository";
import { OrderRepository } from "@/modules/Orders/repositories/implementations/OrderRepository";
import { IOrderRepository } from "@/modules/Orders/repositories/IOrderRepository";
import { ProductRepository } from "@/modules/Products/repositories/implementations/ProductRepository";
import { IProductRepository } from "@/modules/Products/repositories/IProductRepository";
import { UsersRepository } from "@/modules/Users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "@/modules/Users/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IAuthRepository>("AuthRepository", AuthRepository);

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);

container.registerSingleton<ICartRepository>("CartRepository", CartRepository);

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository
);

container.registerSingleton<IAuthRepository>("AuthRepository", AuthRepository);