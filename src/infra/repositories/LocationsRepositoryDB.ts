import { ObjectId } from 'mongodb';
import { LocationsWriteRepository } from '../../application/repositories/LocationRepository';
import { LocationsRecord } from '../../domain/locations_record/LocationRecord';
import { MongodbCollectionFactory } from '../factories/MongodbCollectionFactory';
import { LocationsRecordRaw } from '../database/schemas/location';

const db_map = {
  db_to_app(locations_raw: LocationsRecordRaw): LocationsRecord {
    return new LocationsRecord(
      locations_raw._id.toString(),
      locations_raw.geolocations,
      locations_raw.imei,
      locations_raw.reference_date,
    );
  },
  app_to_db(locations: LocationsRecord): LocationsRecordRaw {
    return {
      _id: new ObjectId(locations.id),
      geolocations: locations.geolocations,
      imei: locations.IMEI,
      reference_date: locations.reference_date,
    };
  },
};

export class LocationsWriteRepo implements LocationsWriteRepository {
  async save(locations_record: LocationsRecord) {
    const locations_col =
      await MongodbCollectionFactory.locations_collection();
    const locations_id = new ObjectId(locations_record.id);
    await locations_col.findOneAndUpdate(
      { _id: locations_id },
      { $set: db_map.app_to_db(locations_record) },
      { upsert: true },
    );
  }

  async restore(locations_id: string): Promise<LocationsRecord | null> {
    const locations_col =
      await MongodbCollectionFactory.locations_collection();
    const locations_raw = await locations_col.findOne({
      _id: new ObjectId(locations_id),
    });

    if (locations_raw === null) return null;
    const locations_record = db_map.db_to_app(locations_raw);
    return locations_record;
  }

  async find_location_by_id_and_reference_date(
    imei: number,
    reference_date: string,
  ) {
    const locations_col =
      await MongodbCollectionFactory.locations_collection();

    const locations_raw = await locations_col.findOne({
      imei: imei,
      reference_date: reference_date,
    });

    if (locations_raw === null) return null;
    const locations_record = db_map.db_to_app(locations_raw);
    return locations_record;
  }
}
