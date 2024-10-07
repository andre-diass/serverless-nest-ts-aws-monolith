import { LocationsRecord } from '../../../domain/locations_record/LocationRecord';
import { GeoPoint } from '../../../domain/value_objects/GeoPoint';
import { Command } from '../../Command';

export class StoreLocation extends Command {
  async execute(payload: any): Promise<LocationsRecord> {
    // extract coordinates from payload
    const mocked_coordinates = { lat: 80.0, long: 100 };
    const response_string = Object.keys(payload)[0];

    console.log(response_string);

    const coordinates =
      this.extract_coordinates_from_response(response_string);
    console.log(coordinates);

    // extract IMEI
    const mocked_imei = 1111111;

    const geo_point = GeoPoint.new(coordinates.lat, coordinates.long);

    const locations_record = LocationsRecord.new(geo_point, mocked_imei);

    const { write } = this.repositories_factory.locations_repository();
    write.save(locations_record);
    return locations_record;
  }

  extract_coordinates_from_response(response: string): {
    lat: number;
    long: number;
  } {
    // Remove non-printable characters
    const clean_response = response.replace(/[^ -~]+/g, '');

    // Define regex to extract latitude and longitude
    const regex =
      /CGNSINF:\s*\d+,\d+,\d+\.\d+,\s*(-?\d+\.\d+),\s*(-?\d+\.\d+)/;

    const match = clean_response.match(regex);
    if (match && match.length >= 3) {
      const lat = parseFloat(match[1]);
      const long = parseFloat(match[2]);
      return { lat, long };
    }

    return { lat: 100, long: 100 };
  }
}
