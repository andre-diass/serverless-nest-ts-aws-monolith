import { AuthPayload } from '../../nest/auth/auth.decorator';
import { OwnedData } from '../contracts';
import { ObjectId } from 'mongodb';

export class Product implements OwnedData {
  constructor(
    public id: string,
    public user_id: string,
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public created_at: Date,
  ) {}
  owns_data(auth_data: AuthPayload) {
    return auth_data.id === this.user_id;
  }
  static new(
    user: AuthPayload,
    description: string,
    price: number,
    category: string,
    name: string,
  ) {
    const new_id = new ObjectId().toString();
    const created_at = new Date();
    return new Product(
      new_id,
      user.id,
      name,
      description,
      price,
      category,
      created_at,
    );
  }
}
