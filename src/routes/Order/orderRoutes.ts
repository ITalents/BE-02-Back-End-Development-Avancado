import { Router } from "express";
import authMiddleware from "middlewares/authMiddleware";
import paginationMiddleware from "middlewares/paginationMiddleware";
import schemaValidationMiddleware from "middlewares/schemaValidationMiddleware";
import { orderSchemmaJoi } from "modules/Orders/schemas/OrderSchemaJoi";

import createOrderController from "modules/Orders/useCases/createOrder/createOrderController";
import findAllOrderController from "modules/Orders/useCases/findAllOrders/findAllOrderController";
import findByIdOrderController from "modules/Orders/useCases/findOrderById/findByIdOrderController";
import removeOrderController from "modules/Orders/useCases/removeOrder/removeOrderController";
import updateStatusOrderController from "modules/Orders/useCases/updateStatusOrder/updateStatusOrderController";

const orderRouter = Router();

orderRouter.use(authMiddleware.handle);
orderRouter.post(
  "/",
  schemaValidationMiddleware.handle(orderSchemmaJoi),
  createOrderController.handle
);
orderRouter.get(
  "/",
  paginationMiddleware.handle,
  findAllOrderController.handle
);
orderRouter.get("/:id", findByIdOrderController.handle);
orderRouter.patch("/:id", updateStatusOrderController.handle);
orderRouter.delete("/:id", removeOrderController.handle);

export default orderRouter;
