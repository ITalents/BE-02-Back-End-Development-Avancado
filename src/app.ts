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

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware.handle);

export async function init(): Promise<Express> {
  await ConnectToMongoDb.execute();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await ConnectToMongoDb.disconnect();
}

export default app;
