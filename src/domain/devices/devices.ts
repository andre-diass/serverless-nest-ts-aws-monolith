import { ObjectId } from 'mongodb';
import { GeoPoint } from '../value_objects/GeoPoint';

export class Devices {
  constructor(
    public IMEI: number,
    public id: string,
    public user_id: string,
  ) {}
  // owns_data(auth_data: AuthPayload) {
  //   return auth_data.id === this.user_id;
  // }

  static new(IMEI: number, user_id: string) {
    const new_id = new ObjectId().toString();

    return new Devices(IMEI, new_id, user_id);
  }
}
