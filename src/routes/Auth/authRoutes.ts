import { Router } from "express";
import instance from "./instaces";

const authRouter = Router();

authRouter.post("/signin", instance.signinController.handle);

export default authRouter;
