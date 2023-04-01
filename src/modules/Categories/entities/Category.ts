import { ObjectId } from "mongodb";

export class Category {
  _id: ObjectId;
  name: string;
  created_at: Date;

  constructor(_id: ObjectId, name: string) {
    this._id = _id;
    this.name = name;
    this.created_at = new Date();
  }
}
