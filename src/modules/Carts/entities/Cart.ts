import { Product } from "modules/Products/entities/Product";
import { ObjectId } from "mongodb";

export class Cart {
  _id: ObjectId;
  products: Product[];
  total_price: number;
  freight: number;
  user_id: ObjectId;
  created_at: Date;

  constructor(
    _id: ObjectId,
    products: Product[],
    total_price: number,
    freight: number,
    user_id: ObjectId
  ) {
    this._id = _id;
    this.products = products;
    this.total_price = total_price;
    this.freight = freight;
    this.user_id = user_id;
    this.created_at = new Date();
  }
}
