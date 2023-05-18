import jwt from "jsonwebtoken";
import { IAuthRepository } from "../IAuthRepositories";
import "dotenv/config";
import { User } from "@/modules/Users/entities/User";
import UserSchema from "@/modules/Users/schemas/UserSchema";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@/helpers/errors/apiErrors";

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string): Promise<User> {
    const user = await UserSchema.findOne({ email }).select("password");
    if (!user) throw new NotFoundError("User not found!");
    return user;
  }
  generateToken(userId: ObjectId): string {
    const secret = process.env.SECRET as string;
    return jwt.sign({ id: userId }, secret, { expiresIn: 86400 });
  }
}
