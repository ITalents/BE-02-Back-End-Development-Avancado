import { Router } from "express";
import signinController from "@/modules/Auth/useCases/signin/signinController";
import oauthGithubController from "@/modules/Auth/useCases/oAuthGitHub/oauthGithubController";
import schemaValidationMiddleware from "@/middlewares/schemaValidationMiddleware";
import { authSchemmaJoi } from "@/modules/Auth/schemas/AuthSchemaJoi";

const authRouter = Router();

authRouter.post(
  "/signin",
  schemaValidationMiddleware.handle(authSchemmaJoi),
  signinController.handle
);
authRouter.post("/signin-github", oauthGithubController.handle);

export default authRouter;
