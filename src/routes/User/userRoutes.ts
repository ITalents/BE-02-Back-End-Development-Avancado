import { Router } from "express";
import validateSchema from "@/middlewares/schemaValidationMiddleware";
import authMiddleware from "@/middlewares/authMiddleware";
import paginationMiddleware from "@/middlewares/paginationMiddleware";

import { userSchemmaJoi } from "@/modules/Users/schemas/UserSchemaJoi";
import createUserController from "@/modules/Users/useCases/createUser/createUserController";
import findByIdUserController from "@/modules/Users/useCases/findUserById/findByIdUserController";
import findAllUsersController from "@/modules/Users/useCases/findAllUsers/findAllUsersController";
import updateUserController from "@/modules/Users/useCases/updateUser/updateUserController";
import removeUserController from "@/modules/Users/useCases/removeUser/removeUserController";
import addAddressUserController from "@/modules/Users/useCases/addAddress/addAddressUserController";
import removeAddressUserController from "@/modules/Users/useCases/removeAddress/removeAddressUserController";
import addFavoriteProductController from "@/modules/Users/useCases/addFavoriteProduct/addFavoriteProductController";
import removeFavoriteProductController from "@/modules/Users/useCases/removeFavoriteProduct/removeFavoriteProductController";
import { addressSchemmaJoi } from "@/modules/Users/schemas/AddressSchemaJoi";
import updateUserAvatarController from "@/modules/Users/useCases/updateUserAvatar/updateUserAvatarController";
import multer from "multer";
import uploadConfig from "@/helpers/upload";
import findUserAvatarController from "@/modules/Users/useCases/findUserAvatar/findUserAvatarController";

const userRouter = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

userRouter.post(
  "/",
  validateSchema.handle(userSchemmaJoi),
  createUserController.handle
);

userRouter.use(authMiddleware.handle);

userRouter.get("/:id", findByIdUserController.handle);

userRouter.get("/", paginationMiddleware.handle, findAllUsersController.handle);

userRouter.put("/update", authMiddleware.handle, updateUserController.handle);
userRouter.delete("/delete", removeUserController.handle);

userRouter.post(
  "/add-address",
  validateSchema.handle(addressSchemmaJoi),
  addAddressUserController.handle
);
userRouter.delete(
  "/remove-address/:idAddress",
  removeAddressUserController.handle
);

userRouter.post(
  "/add-favorite-product/:productId",
  addFavoriteProductController.handle
);

userRouter.delete(
  "/remove-favorite-product/:productId",
  removeFavoriteProductController.handle
);

userRouter.get("/avatar/:id", findUserAvatarController.handle);

userRouter.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export default userRouter;
