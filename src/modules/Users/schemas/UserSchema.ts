import { User } from "../entities/User";
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  addresses: [
    {
      street: { type: String, required: true },
      number: { type: Number, required: true },
      complement: { type: String, required: true },
      zipcode: { type: String, required: true },
      created_at: { type: Date, default: Date.now() },
    },
  ],
  favorite_products: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      created_at: { type: Date, default: Date.now() },
    },
  ],
  created_at: { type: Date, required: true, default: Date.now() },
  admin: { type: Boolean, required: true, default: false },
});

UserSchema.pre<User>("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.pre<User>("findOneAndUpdate", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default model<User>("users", UserSchema);
