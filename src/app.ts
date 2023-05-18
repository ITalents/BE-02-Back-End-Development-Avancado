import "express-async-errors";
import "reflect-metadata";

import express, { Express } from "express";
import cors from "cors";
import "@/helpers/container/";
import router from "@/routes/index";
import ConnectToMongoDb from "@/database/index";
import errorMiddleware from "@/middlewares/errorMiddleware";
import loadEnvs from "@/helpers/env/envs";

loadEnvs();
const app = express();
ConnectToMongoDb.execute();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware.handle);

/* process.on("SIGINT", async () => {
  try {
    ConnectToMongoDb.disconnect();
    console.log("Conexão com o banco de dados fechada.");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao fechar a conexão com o banco de dados:", error);
    process.exit(1);
  }
}); */

export default app;
