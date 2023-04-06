import { Router } from "express";
import authMiddleware from "middlewares/authMiddleware";
import paginationMiddleware from "middlewares/paginationMiddleware";
import schemaValidationMiddleware from "middlewares/schemaValidationMiddleware";
import { cartSchemmaJoi } from "modules/Carts/schemas/CartSchemaJoi";

import createCartController from "modules/Carts/useCases/createCart/createCartController";
import findAllCartsController from "modules/Carts/useCases/findAllCarts/findAllCartsController";
import findByIdCartController from "modules/Carts/useCases/findCartById/findByIdCartController";
import removeCartController from "modules/Carts/useCases/removeCart/removeCartController";
import updateCartController from "modules/Carts/useCases/updateCart/updateCartController";

const cartRouter = Router();

cartRouter.use(authMiddleware.handle);
cartRouter.post(
  "/",
  schemaValidationMiddleware.handle(cartSchemmaJoi),
  createCartController.handle
);
cartRouter.get("/", paginationMiddleware.handle, findAllCartsController.handle);
cartRouter.get("/:id", findByIdCartController.handle);
cartRouter.patch("/:id", updateCartController.handle);
cartRouter.delete("/:id", removeCartController.handle);

export default cartRouter;
