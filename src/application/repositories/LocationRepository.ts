import { LocationsRecord } from '../../domain/locations_record/LocationRecord';

export interface LocationsWriteRepository {
  save(locations_record: LocationsRecord): Promise<void>;
  restore(locations_record_id: string): Promise<LocationsRecord | null>;
  find_location_by_id_and_reference_date(
    imei: number,
    reference_date: string,
  ): Promise<LocationsRecord | null>;
}
