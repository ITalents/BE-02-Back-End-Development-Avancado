import { IAuthRepository } from "modules/Auth/repositories/IAuthRepositories";
import { AuthRepository } from "modules/Auth/repositories/implementations/AuthRepositories";
import { ICategoriesRepository } from "modules/Categories/repositories/ICategoriesRepository";
import { CategoriesRepository } from "modules/Categories/repositories/implementations/CategoriesRepository";
import { UsersRepository } from "modules/Users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "modules/Users/repositories/IUsersRepository";
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
