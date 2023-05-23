import { User } from "@/modules/Users/entities/User";
import UserSchema from "@/modules/Users/schemas/UserSchema";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ObjectId } from "mongodb";
import ProductSchema from "@/modules/Products/schemas/ProductSchema";
import fs from "fs";
import { createPathAndImage } from "../factories/users.factories";

export async function cleanDatabase() {
  await UserSchema.deleteMany({});
  await ProductSchema.deleteMany({});
  fs.unlink(createPathAndImage(), () => {});
}

export async function generateToken(user: User) {
  const incomingUser = user;
  const jwtSecret = process.env.SECRET as string;
  const token = jwt.sign({ id: incomingUser._id }, jwtSecret);
  return token;
}

export function createObjectId() {
  const objectId = new ObjectId();
  return objectId;
}
