import { LocationsRecord } from '../../../domain/locations_record/LocationRecord';
import { GeoPoint } from '../../../domain/value_objects/GeoPoint';
import { Command } from '../../Command';

export class StoreLocation extends Command {
  async execute(paylod: any): Promise<LocationsRecord> {
    // extract coordinates from payload
    const mocked_coordinates = { lat: 80.0, long: 100 };
    console.log(paylod);

    const coordinates = this.extract_coordinates_from_payload(paylod);
    console.log(coordinates);

    // extract IMEI
    const mocked_imei = 1111111;

    const geo_point = GeoPoint.new(
      mocked_coordinates.lat,
      mocked_coordinates.long,
    );

    const locations_record = LocationsRecord.new(geo_point, mocked_imei);

    const { write } = this.repositories_factory.locations_repository();
    write.save(locations_record);
    return locations_record;
  }

  extract_coordinates_from_payload(payload: string): {
    lat: number;
    long: number;
  } {
    const payload_str =
      typeof payload === 'string' ? payload : String(payload);
    const regex = /CGNSINF: [^,]*,[^,]*,[^,]*,([^,]+),([^,]+)/;
    const match = payload_str.match(regex);

    if (match && match.length >= 3) {
      const lat = parseFloat(match[1]);
      const long = parseFloat(match[2]);
      return { lat, long };
    }

    return { lat: 100, long: 100 };
  }
}
