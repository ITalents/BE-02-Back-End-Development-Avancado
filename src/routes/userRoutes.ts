import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidationMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CreateUserController } from "../modules/Users/useCases/createUser/createUserController";
import { userSchemmaJoi } from "../modules/Users/schemas/UserSchemaJoi";
import { FindByIdUserController } from "modules/Users/useCases/findUserById/findByIdUserController";

const userRouter = Router();

const createUserController = new CreateUserController();
const findByIdUserController = new FindByIdUserController();

userRouter.post(
  "/",
  validateSchema(userSchemmaJoi),
  createUserController.handle
);

router.get("/:id", authMiddleware, findByIdUserController.handle);

/* router.post(
  "/add-address/:id",
  authMiddleware,
  validateSchema(userSchemmaJoi),
  usuarioController.addUserAddressController
); */
/* router.post(
  "/addFavProduct/:id",
  authMiddleware,
  validaIdParams,
  valida_IdBody,
  usuarioController.addUserFavProductController
);


router.get(
  "/findAll",
  authMiddleware,
  paginacao,
  usuarioController.findAllUsersController
);

router.put(
  "/update/:id",
  authMiddleware,
  validaIdParams,
  validaUsuario,
  usuarioController.updateUserController
);

router.delete(
  "/remove/:id",
  authMiddleware,
  validaIdParams,
  usuarioController.removeUserController
);
router.delete(
  "/removeAddress",
  authMiddleware,
  usuarioController.removeUserAddressController
);
router.delete(
  "/removeFavProduct/:id",
  authMiddleware,
  validaIdParams,
  usuarioController.removeUserFavProductController
); */

export default userRouter;
