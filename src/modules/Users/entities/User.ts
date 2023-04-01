import { Product } from "../../Products/entities/Product";
import { Address } from "./Address";
import { ObjectId } from "mongodb";

export class User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  image: string;
  addresses: Address[];
  favorite_products: Product[];
  admin: boolean;
  created_at: Date;

  constructor(
    _id: ObjectId,
    name: string,
    email: string,
    password: string,
    admin: boolean,
    image: string,
    addresses: Address[],
    favorite_products: Product[]
  ) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.image = image;
    this.addresses = addresses;
    this.favorite_products = favorite_products;
    this.admin = admin;
    this.created_at = new Date();
  }
}
