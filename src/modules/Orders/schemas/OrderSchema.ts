import { Schema, model } from "mongoose";
import { Order } from "../entities/Order";

const OrderSchema = new Schema<Order>({
  products: [
    {
      _id: { type: Schema.Types.ObjectId, required: true, ref: "products" },
      quantity: { type: Number, required: true },
    },
  ],
  total_price: { type: Number, required: true },
  freight: { type: Number, required: true },
  user_id: { type: Schema.Types.ObjectId, required: true, ref: "users" },
  concluded: { type: Boolean, default: false },
  created_at: { type: Date, required: true, default: Date.now() },
});

export default model<Order>("orders", OrderSchema);
