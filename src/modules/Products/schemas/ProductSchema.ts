import { Schema, model } from "mongoose";
import { Product } from "../entities/Product";

const ProductSchema = new Schema<Product>({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  unit_price: { type: Number, required: true },
  image: { type: String },
  bar_code: { type: Number, unique: true, required: true },
  categories: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: "categories",
      },
      create_at: { type: Date, required: true, default: Date.now() },
    },
  ],
  created_at: { type: Date, required: true, default: Date.now() },
});

export default model<Product>("products", ProductSchema);
