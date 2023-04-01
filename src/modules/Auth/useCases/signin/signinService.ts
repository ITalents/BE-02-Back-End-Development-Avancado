import { inject, injectable } from "tsyringe";
import errors from "errors";
import { IAuthRepository } from "modules/Auth/repositories/IAuthRepositories";
import { Auth } from "modules/Auth/entities/Auth";
import { IUsersRepository } from "modules/Users/repositories/IUsersRepository";

@injectable()
export class SigninService {
  constructor(
    @inject("AuthRepository")
    private authRepository: IAuthRepository
  ) {}

  async execute(data: Auth): Promise<string> {
    if (!data) throw errors.conflictError("Body is required");

    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) throw errors.notFoundError();

    return this.authRepository.generateToken(user._id);
  }
}
