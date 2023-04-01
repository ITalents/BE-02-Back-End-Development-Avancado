import "reflect-metadata";
import "dotenv/config";
import "./database";

import express from "express";
import cors from "cors";
import "./shared/container";
import router from "routes";
import connectToDatabase from "./database";
import { handleApplicationErrors } from "./middlewares/errorMiddleware";

const app = express();
connectToDatabase();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(handleApplicationErrors);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running, in port: ${port}`));
