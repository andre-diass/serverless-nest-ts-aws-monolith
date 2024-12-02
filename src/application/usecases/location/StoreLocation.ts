import { LocationsRecord } from '../../../domain/locations_record/LocationRecord';
import { GeoPoint } from '../../../domain/value_objects/GeoPoint';
import { Command } from '../../Command';

export class StoreLocation extends Command {
  async execute(payload: any): Promise<LocationsRecord> {
    let locations_record: LocationsRecord;
    const mocked_imei = 869951036930547;
    const response_string = Object.keys(payload)[0];

    const { write } = this.repositories_factory.locations_repository();

    const coordinates =
      this.extract_coordinates_from_response(response_string);
    console.log('IMEI:', mocked_imei);

    console.log('COORDENADAS:', coordinates);

    const geo_point = GeoPoint.new(coordinates.lat, coordinates.long);

    const reference_date = new Date().toLocaleDateString();

    const retrivied_locations_record =
      await write.find_location_by_id_and_reference_date(
        mocked_imei,
        reference_date,
      );

    if (retrivied_locations_record === null) {
      locations_record = LocationsRecord.new(geo_point, mocked_imei);
    } else {
      locations_record =
        retrivied_locations_record.add_location(geo_point);
    }

    write.save(locations_record);
    return locations_record;
  }

  private extract_coordinates_from_response(response: string): {
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
