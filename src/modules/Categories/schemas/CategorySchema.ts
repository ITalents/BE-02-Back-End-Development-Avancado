import { Schema, model } from "mongoose";
import { Category } from "../entities/Category";

const CategorySchema = new Schema<Category>({
  name: { type: String, unique: true, required: true },
  created_at: { type: Date, required: true, default: Date.now() },
});

export default model<Category>("categories", CategorySchema);
