import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { NotFoundError } from "@/helpers/errors/apiErrors";
import { deleteFile } from "@/helpers/upload/file";

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string, avatar: string): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundError("User not found");

    if (user.image) {
      await deleteFile(user.image);
    }

    await this.usersRepository.updateAvatar(id, avatar);
  }
}
