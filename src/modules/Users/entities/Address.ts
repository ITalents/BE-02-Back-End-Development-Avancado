export class Address {
  street: string;
  number: number;
  complement: string;
  zipcode: string;
  created_at: Date;

  constructor(
    street: string,
    number: number,
    complement: string,
    zipcode: string
  ) {
    this.street = street;
    this.number = number;
    this.complement = complement;
    this.zipcode = zipcode;
    this.created_at = new Date();
  }
}
