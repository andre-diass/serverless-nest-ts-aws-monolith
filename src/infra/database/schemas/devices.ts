import { ObjectId } from 'mongodb';

export type DevicesRaw = {
  imei: number;
  _id: ObjectId;
  user_id: string;
};
