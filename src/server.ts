import "reflect-metadata";
import express from "express";
import cors from "cors";
import "./shared/container";
import router from "routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running, in port: ${port}`));
