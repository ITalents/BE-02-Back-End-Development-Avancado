import { User } from "modules/Users/entities/User";
import { ObjectId } from "mongodb";

export interface IAuthRepository {
  findUserByEmail(email: string): Promise<User>;
  generateToken(userId: ObjectId): string;
}
