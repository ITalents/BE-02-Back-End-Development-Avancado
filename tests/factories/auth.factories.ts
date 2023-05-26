import { AuthRepository } from "@/modules/Auth/repositories/implementations/AuthRepositories";
import { SigninService } from "@/modules/Auth/useCases/signin/signinService";

export const authRepository = new AuthRepository();
export const signinService = new SigninService(authRepository);
