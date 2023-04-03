import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";

import express from "express";
import cors from "cors";
import "./helpers/container";
import router from "routes";
import ConnectToMongoDb from "database";
import errorMiddleware from "./middlewares/errorMiddleware";

const app = express();
ConnectToMongoDb.execute();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware.handle);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running, in port: ${port}`));
