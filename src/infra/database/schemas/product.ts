/* eslint-disable @typescript-eslint/ban-types */
import { ObjectId } from 'mongodb';
import { UnitOfMeasurement } from '../../../domain/common';
import {
  Artisanal,
  Cosmetics,
  Organics,
  PlantsAndSeeds,
  WoodProducts,
} from '../../../domain/product_details/ProductDetails';

export type ProductRaw = {
  _id: ObjectId;
  user_id: ObjectId;
  name: string;
  description: string;
  price: number;
  created_at: Date;
  quantity: number;
  availability: boolean;
  unit_of_measurement: UnitOfMeasurement;
} & (
  | { product_type: 'WOOD_PRODUCTS'; details: WoodProducts }
  | { product_type: 'ARTISANAL'; details: Artisanal }
  | { product_type: 'COSMETICS'; details: Cosmetics }
  | { product_type: 'ORGANICS'; details: Organics }
  | { product_type: 'PLANTS_AND_SEEDS'; details: PlantsAndSeeds }
);
