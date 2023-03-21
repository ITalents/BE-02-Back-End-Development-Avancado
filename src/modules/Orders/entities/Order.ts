import { User } from "modules/Users/entities/User";

export class Order {
  constructor(
    public id: string,
    public products: string,
    public final_price: number,
    public freight: number,
    public user_id: string,
    public user: User,
    public createdAt: Date
  ) {}
}
