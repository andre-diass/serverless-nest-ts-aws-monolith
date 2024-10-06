import { LocationsRecord } from '../../../domain/locations_record/LocationRecord';
import { GeoPoint } from '../../../domain/value_objects/GeoPoint';
import { Command } from '../../Command';

export class StoreLocation extends Command {
  async execute(paylod: any): Promise<LocationsRecord> {
    // extract coordinates from payload
    const mocked_coordinates = { lat: 80.0, long: 100 };

    // extract IMEI
    const mocked_imei = 1111111;

    // validate if I shouldn't just use the static method add_location instead of instacing a new document

    const geo_point = GeoPoint.new(
      mocked_coordinates.lat,
      mocked_coordinates.long,
    );

    const locations_record = LocationsRecord.new(geo_point, mocked_imei);

    const { write } = this.repositories_factory.locations_repository();
    write.save(locations_record);
    return locations_record;
  }
}
