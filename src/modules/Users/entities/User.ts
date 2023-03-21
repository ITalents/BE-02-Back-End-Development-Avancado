export class User {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public unit_price: number,
    public image: string,
    public barcode: string,
    public category_id: string,
    public created_at: Date
  ) {}
}
