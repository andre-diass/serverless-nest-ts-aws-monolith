/* eslint-disable @typescript-eslint/ban-types */
import { ObjectId } from 'mongodb';
import { GeoPoint } from '../../../domain/value_objects/GeoPoint';

export type LocationsRecordRaw = {
  _id: ObjectId;
  geolocations: GeoPoint[];
  imei: number;
  reference_date: string;
};
