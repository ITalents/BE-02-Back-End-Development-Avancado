import { Router } from "express";
import { validateSchema } from "../../middlewares/schemaValidationMiddleware";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { userSchemmaJoi } from "../../modules/Users/schemas/UserSchemaJoi";
import { paginationMiddleware } from "middlewares/paginationMiddleware";
import instance from "../User/instances";

const userRouter = Router();

userRouter.post(
  "/",
  validateSchema(userSchemmaJoi),
  instance.createUserController.handle
);

userRouter.get("/:id", authMiddleware, instance.findByIdUserController.handle);
userRouter.get(
  "/",
  authMiddleware,
  paginationMiddleware,
  instance.findAllUsersController.handle
);

userRouter.put(
  "/:id",
  authMiddleware,
  validateSchema(userSchemmaJoi),
  instance.updateUserController.handle
);
userRouter.delete("/:id", authMiddleware, instance.removeUserController.handle);

userRouter.post(
  "/add-address/:id",
  authMiddleware,
  validateSchema(userSchemmaJoi),
  instance.addAddressController.handle
);

userRouter.delete(
  "/remove-address/:id",
  authMiddleware,
  instance.removeAddressController.handle
);

userRouter.post(
  "/add-favorite-product/:id",
  authMiddleware,
  instance.addFavoriteProductController.handle
);

userRouter.delete(
  "/removeFavProduct/:id",
  authMiddleware,
  instance.removeFavoriteProductController.handle
);

export default userRouter;
