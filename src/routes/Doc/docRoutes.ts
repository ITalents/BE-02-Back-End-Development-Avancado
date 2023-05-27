import { Router } from "express";
const swaggetUi = require("swagger-ui-express");
const swaggerDocument = require("../../swagger.json");

const docRouter = Router();

docRouter.use("/api-docs", swaggetUi.serve);
docRouter.get("/api-docs", swaggetUi.setup(swaggerDocument));

export default docRouter;
