import { Router } from "express";
import signinController from "@/modules/Auth/useCases/signin/signinController";
import oauthGithubController from "@/modules/Auth/useCases/oAuthGitHub/oauthGithubController";

const authRouter = Router();

authRouter.post("/signin", signinController.handle);
authRouter.post("/signin-github", oauthGithubController.handle);

export default authRouter;
