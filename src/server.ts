import "reflect-metadata";
import "dotenv/config";
import "./database";

import express from "express";
import cors from "cors";
import "./shared/container";
import router from "routes";
import connectToDatabase from "./database";

const app = express();
app.use(express.json());
app.use(cors());
connectToDatabase();
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running, in port: ${port}`));
