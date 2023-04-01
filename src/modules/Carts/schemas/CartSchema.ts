import { Schema, model } from "mongoose";
import { Cart } from "../entities/Cart";

const CartSchema = new Schema<Cart>({
  products: [
    {
      _id: { type: Schema.Types.ObjectId, required: true, ref: "products" },
      quantity: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  freight: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  created_at: { type: Date, required: true, default: Date.now() },
});

export default model<Cart>("carts", CartSchema);
