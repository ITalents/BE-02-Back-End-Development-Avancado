import { Router } from "express";
import validateSchema from "../../middlewares/schemaValidationMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";
import { userSchemmaJoi } from "../../modules/Users/schemas/UserSchemaJoi";
import paginationMiddleware from "middlewares/paginationMiddleware";
import createUserController from "modules/Users/useCases/createUser/createUserController";
import findByIdUserController from "modules/Users/useCases/findUserById/findByIdUserController";
import findAllUsersController from "modules/Users/useCases/findAllUsers/findAllUsersController";
import updateUserController from "modules/Users/useCases/updateUser/updateUserController";
import removeUserController from "modules/Users/useCases/removeUser/removeUserController";
import addAddressUserController from "modules/Users/useCases/addAddress/addAddressUserController";
import removeAddressUserController from "modules/Users/useCases/removeAddress/removeAddressUserController";
import addFavoriteProductController from "modules/Users/useCases/addFavoriteProduct/addFavoriteProductController";
import removeFavoriteProductController from "modules/Users/useCases/removeFavoriteProduct/removeFavoriteProductController";

const userRouter = Router();

userRouter.post(
  "/",
  validateSchema.handle(userSchemmaJoi),
  createUserController.handle
);

userRouter.use(authMiddleware.handle);

userRouter.get("/:id", findByIdUserController.handle);
userRouter.get("/", paginationMiddleware.handle, findAllUsersController.handle);

userRouter.put("/:id", authMiddleware.handle, updateUserController.handle);
userRouter.delete("/:id", removeUserController.handle);

userRouter.post(
  "/add-address/:id",
  validateSchema.handle(userSchemmaJoi),
  addAddressUserController.handle
);
userRouter.delete("/remove-address/:id", removeAddressUserController.handle);

userRouter.post(
  "/add-favorite-product/:id",
  addFavoriteProductController.handle
);

userRouter.delete(
  "/removeFavProduct/:id",
  removeFavoriteProductController.handle
);

export default userRouter;
