import { AddAddressUserController } from "modules/Users/useCases/addAddress/addAddressUserController";
import { AddFavoriteProductController } from "modules/Users/useCases/addFavoriteProduct/addFavoriteProductController";
import { CreateUserController } from "modules/Users/useCases/createUser/createUserController";
import { FindAllUsersController } from "modules/Users/useCases/findAllUsers/findAllUsersController";
import { FindByIdUserController } from "modules/Users/useCases/findUserById/findByIdUserController";
import { RemoveAddressUserController } from "modules/Users/useCases/removeAddress/removeAddressUserController";
import { RemoveFavoriteProductController } from "modules/Users/useCases/removeFavoriteProduct/removeFavoriteProductController";
import { RemoveUserController } from "modules/Users/useCases/removeUser/removeUserController";
import { UpdateUserController } from "modules/Users/useCases/updateUser/updateUserController";

const createUserController = new CreateUserController();
const findByIdUserController = new FindByIdUserController();
const findAllUsersController = new FindAllUsersController();
const updateUserController = new UpdateUserController();
const removeUserController = new RemoveUserController();
const addAddressController = new AddAddressUserController();
const removeAddressController = new RemoveAddressUserController();
const addFavoriteProductController = new AddFavoriteProductController();
const removeFavoriteProductController = new RemoveFavoriteProductController();

export default {
  createUserController,
  findByIdUserController,
  findAllUsersController,
  updateUserController,
  removeUserController,
  addAddressController,
  removeAddressController,
  addFavoriteProductController,
  removeFavoriteProductController,
};
