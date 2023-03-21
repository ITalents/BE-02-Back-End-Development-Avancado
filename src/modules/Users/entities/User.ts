import { Products } from "../../Products/entities/Products";
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  ObjectID,
} from "typeorm";
import { Addresses } from "./Addresses";

@Entity("users")
export class User {
  @ObjectIdColumn()
  id?: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  image?: string;

  @Column((type) => Addresses)
  addresses?: Addresses[];

  @Column((type) => Products)
  favorite_products?: Products[];

  @Column()
  admin?: boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    admin: boolean,
    created_at: Date,
    image?: string,
    addresses?: Addresses[],
    favorite_products?: Products[]
  ) {
    this.id = new ObjectID();
    this.name = name;
    this.email = email;
    this.password = password;
    this.image = image;
    this.addresses = addresses;
    this.favorite_products = favorite_products;
    this.admin = admin;
    this.created_at = created_at;
  }
}
