import { Router } from "express";
import authMiddleware from "@/middlewares/authMiddleware";
import validateSchemma from "@/middlewares/schemaValidationMiddleware";
import paginationMiddleware from "@/middlewares/paginationMiddleware";

import createCategoryController from "@/modules/Categories/useCases/createCategory/createCategoryController";
import findByIdCategoryController from "@/modules/Categories/useCases/findByIdCategory/findByIdCategoryController";
import findAllCategoriesController from "@/modules/Categories/useCases/findAllCategory/findAllCategoriesController";
import updateCategoryController from "@/modules/Categories/useCases/updateCategory/updateCategoryController";
import removeCategoryController from "@/modules/Categories/useCases/removeCategory/removeCategoryController";
import { categorySchemmaJoi } from "@/modules/Categories/schemas/CategorySchemaJoi";

const categoryRouter = Router();

categoryRouter.post(
  "/",
  authMiddleware.handle,
  validateSchemma.handle(categorySchemmaJoi),
  createCategoryController.handle
);

categoryRouter.get(
  "/",
  authMiddleware.handle,
  paginationMiddleware.handle,
  findAllCategoriesController.handle
);

categoryRouter.get(
  "/:id",
  authMiddleware.handle,
  findByIdCategoryController.handle
);

categoryRouter.put(
  "/:id",
  authMiddleware.handle,
  validateSchemma.handle(categorySchemmaJoi),
  updateCategoryController.handle
);

categoryRouter.delete(
  "/:id",
  authMiddleware.handle,
  removeCategoryController.handle
);

export default categoryRouter;
