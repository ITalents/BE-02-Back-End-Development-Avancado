import { Router } from "express";
import signinController from "@/modules/Auth/useCases/signin/signinController";

const authRouter = Router();

authRouter.post("/signin", signinController.handle);
authRouter.post("/signin-github", signinController.handle);

export default authRouter;
