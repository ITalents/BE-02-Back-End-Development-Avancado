import { Router } from "express";
import { validateSchema } from "../../middlewares/schemaValidationMiddleware";
import authMiddleware from "../../middlewares/authMiddleware";
import { userSchemmaJoi } from "../../modules/Users/schemas/UserSchemaJoi";
import paginationMiddleware from "middlewares/paginationMiddleware";
import instance from "../User/instances";

const userRouter = Router();

userRouter.post(
  "/",
  validateSchema(userSchemmaJoi),
  instance.createUserController.handle
);

userRouter.use(authMiddleware.handle);

userRouter.get("/:id", instance.findByIdUserController.handle);
userRouter.get(
  "/",
  paginationMiddleware.handle,
  instance.findAllUsersController.handle
);

userRouter.put(
  "/:id",
  authMiddleware.handle,
  instance.updateUserController.handle
);
userRouter.delete("/:id", instance.removeUserController.handle);

userRouter.post(
  "/add-address/:id",
  validateSchema(userSchemmaJoi),
  instance.addAddressController.handle
);

userRouter.delete(
  "/remove-address/:id",
  instance.removeAddressController.handle
);

userRouter.post(
  "/add-favorite-product/:id",
  instance.addFavoriteProductController.handle
);

userRouter.delete(
  "/removeFavProduct/:id",
  instance.removeFavoriteProductController.handle
);

export default userRouter;
