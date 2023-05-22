import { User } from "@/modules/Users/entities/User";
import UserSchema from "@/modules/Users/schemas/UserSchema";
import jwt from "jsonwebtoken";
import "dotenv/config";
import mongoose from "mongoose";

export async function cleanDatabase() {
  await UserSchema.deleteMany({});
}

export async function generateToken(user: User) {
  const incomingUser = user;
  const jwtSecret = process.env.SECRET as string;
  const token = jwt.sign({ id: incomingUser._id }, jwtSecret);
  return token;
}

export function createObjectId() {
  const objectId = new mongoose.Types.ObjectId();
  return objectId;
}
