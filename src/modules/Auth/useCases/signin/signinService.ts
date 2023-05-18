import { inject, injectable } from "tsyringe";
import { IAuthRepository } from "@/modules/Auth/repositories/IAuthRepositories";
import { Auth } from "@/modules/Auth/entities/Auth";
import { ConflictError, NotFoundError } from "@/helpers/errors/apiErrors";

@injectable()
export class SigninService {
  constructor(
    @inject("AuthRepository")
    private authRepository: IAuthRepository
  ) {}

  async execute(data: Auth): Promise<string> {
    if (!data) throw new ConflictError("Body is required");

    const user = await this.authRepository.findUserByEmail(data.email);
    if (!user) throw new NotFoundError("User not found");

    return this.authRepository.generateToken(user._id);
  }
}
