import { Category } from "modules/Categories/entities/Category";
import { ObjectId } from "mongodb";

export class Product {
  _id: ObjectId;
  name: string;
  description: string;
  unit_price: number;
  image: string;
  bar_code: number;
  categories: Category[];
  created_at: Date;

  constructor(
    _id: ObjectId,
    name: string,
    description: string,
    unit_price: number,
    image: string,
    bar_code: number,
    categories: Category[]
  ) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.unit_price = unit_price;
    this.image = image;
    this.bar_code = bar_code;
    this.categories = categories;
    this.created_at = new Date();
  }
}
