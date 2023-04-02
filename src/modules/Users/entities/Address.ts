import { ObjectId } from "mongodb";

export class Address {
  _id: ObjectId;
  street: string;
  number: string;
  complement: string;
  zipcode: string;
  created_at: Date;

  constructor(
    _id: ObjectId,
    street: string,
    number: string,
    complement: string,
    zipcode: string
  ) {
    this._id = _id;
    this.street = street;
    this.number = number;
    this.complement = complement;
    this.zipcode = zipcode;
    this.created_at = new Date();
  }
}
