import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import "./database";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "./helpers/container";
import router from "routes";
import connectToDatabase from "./database";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { ApiError } from "helpers/errors/apiErrors";

const app = express();
connectToDatabase();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running, in port: ${port}`));
