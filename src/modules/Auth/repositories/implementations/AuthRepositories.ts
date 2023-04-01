import jwt from "jsonwebtoken";
import { IAuthRepository } from "../IAuthRepositories";
import "dotenv/config";
import { User } from "modules/Users/entities/User";
import UserSchema from "modules/Users/schemas/UserSchema";
import errors from "errors";
import { ObjectId } from "mongodb";

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string): Promise<User> {
    const user = await UserSchema.findOne({ email }).select("password");
    if (!user) throw errors.notFoundError();
    return user;
  }
  generateToken(userId: ObjectId): string {
    return jwt.sign({ id: userId }, process.env.SECRET!, { expiresIn: 86400 });
  }
}
