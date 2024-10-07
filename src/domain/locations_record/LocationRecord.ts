import { ObjectId } from 'mongodb';
import { GeoPoint } from '../value_objects/GeoPoint';

export class LocationsRecord {
  constructor(
    public id: string,
    public geolocations: GeoPoint[],
    public IMEI: number,
    public reference_date: string,
  ) {}
  // owns_data(auth_data: AuthPayload) {
  //   return auth_data.id === this.user_id;
  // }
  add_location(geolocation: GeoPoint) {
    this.geolocations.push(geolocation);
  }

  static new(geolocation: GeoPoint, IMEI: number) {
    const new_id = new ObjectId().toString();
    const geolocations = [];
    geolocations.push(geolocation);

    const reference_date = new Date().toLocaleDateString();

    return new LocationsRecord(new_id, geolocations, IMEI, reference_date);
  }
}
