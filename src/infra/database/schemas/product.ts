import { ObjectId } from 'mongodb';

export interface ProductRaw {
  _id: ObjectId;
  user_id: ObjectId;
  // Data
  name: string;
  description: string;
  price: number;
  category: string;
  // Timestamp
  created_at: Date;
}
