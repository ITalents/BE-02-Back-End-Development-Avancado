import { Router } from "express";
import instance from "./instaces";

const authRouter = Router();

router.post("/signin", instance.signinController.handle);

export default authRouter;
