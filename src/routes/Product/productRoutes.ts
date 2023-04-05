import { Router } from "express";
import authMiddleware from "middlewares/authMiddleware";
import schemaValidationMiddleware from "middlewares/schemaValidationMiddleware";
import { productSchemmaJoi } from "modules/Products/schemas/ProductSchemaJoi";

const productRouter = Router();

productRouter.post(
  "/",
  authMiddleware.handle,
  schemaValidationMiddleware.handle(productSchemmaJoi),
  
);

/* router.get(
  "/findAll",
  authMiddleware,
  paginacao,
  produtoController.findAllProductscontroller
);

router.get(
  "/find/:id",
  authMiddleware,
  validaIdParams,
  produtoController.findProductByIdController
);

router.post(
  "/addCategoria/:id",
  authMiddleware,
  validaIdParams,
  valida_IdBody,
  produtoController.addCategoriaProdutoController
);

router.put(
  "/update/:id",
  authMiddleware,
  validaIdParams,
  validaProduto,
  produtoController.updateProductController
);

router.delete(
  "/delete/:id",
  authMiddleware,
  validaIdParams,
  produtoController.deleteProductController
);
router.delete(
  "/removeCategoria/:id",
  authMiddleware,
  validaIdParams,
  produtoController.removeCategoriaProdutoController
); */

export default productRouter;
