import { Router } from "express";

import authMiddleware from "middlewares/authMiddleware";
import schemaValidationMiddleware from "middlewares/schemaValidationMiddleware";
import { productSchemmaJoi } from "modules/Products/schemas/ProductSchemaJoi";

import addCategoryController from "modules/Products/useCases/addCategory/addCategoryController";
import createProductController from "modules/Products/useCases/createProduct/createProductController";
import findAllProductsController from "modules/Products/useCases/findAllProducts/findAllProductsController";
import findByIdProductController from "modules/Products/useCases/findProductById/findByIdProductController";
import removeCategoryController from "modules/Products/useCases/removeCategory/removeCategoryController";
import removeProductController from "modules/Products/useCases/removeProduct/removeProductController";
import updateProductController from "modules/Products/useCases/updateProduct/updateProductController";

const productRouter = Router();

productRouter.use(authMiddleware.handle);

productRouter.post(
  "/",
  schemaValidationMiddleware.handle(productSchemmaJoi),
  createProductController.handle
);

productRouter.get("/", findAllProductsController.handle);

productRouter.get("/:id", findByIdProductController.handle);

productRouter.patch("/:id", updateProductController.handle);

productRouter.delete("/:id", removeProductController.handle);

productRouter.post(
  "/add-category/:categoryId/:productId",
  addCategoryController.handle
);

productRouter.delete(
  "/remove-category/:categoryId/:productId",
  removeCategoryController.handle
);

export default productRouter;
