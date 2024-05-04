import { AuthPayload } from '../../nest/auth/auth.decorator';
import { UnitOfMeasurement } from '../common';
import { OwnedData } from '../contracts';
import { ObjectId } from 'mongodb';
import {
  ProductDetailsVariant,
  ProductType,
} from '../product_details/ProductDetails';

export class Product<
  T extends ProductDetailsVariant,
  V extends ProductType,
> implements OwnedData
{
  constructor(
    public id: string,
    public user_id: string,
    public name: string,
    public description: string,
    public price: number,
    public created_at: Date,
    public quantity: number,
    public availability: boolean,
    public unit_of_measurement: UnitOfMeasurement,
    public product_type: V,
    public details: T,
  ) {}
  owns_data(auth_data: AuthPayload) {
    return auth_data.id === this.user_id;
  }
  static new<T extends ProductDetailsVariant>(
    user: AuthPayload,
    description: string,
    price: number,
    name: string,
    quantity: number,
    unit_of_measurement: UnitOfMeasurement,
    details: T,
  ) {
    const new_id = new ObjectId().toString();
    const created_at = new Date();
    const availability = true;
    return new Product(
      new_id,
      user.id,
      name,
      description,
      price,
      created_at,
      quantity,
      availability,
      unit_of_measurement,
      details.product_type,
      details,
    );
  }
}
