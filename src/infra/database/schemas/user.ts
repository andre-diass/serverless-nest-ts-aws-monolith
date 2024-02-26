import { ObjectId } from 'mongodb';

export interface UserRaw {
  _id: ObjectId;
  name: string;
  image: string;
  emailVerified: string | null;
  email: string;
}
