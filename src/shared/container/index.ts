import { UsersRepository } from "modules/Users/repositories/implementations/UsersRepository";
import { IUsersRepository } from "modules/Users/repositories/IUsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
