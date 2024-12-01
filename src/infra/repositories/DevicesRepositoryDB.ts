import { ObjectId } from 'mongodb';
import { LocationsRecord } from '../../domain/locations_record/LocationRecord';
import { MongodbCollectionFactory } from '../factories/MongodbCollectionFactory';
import { DevicesRaw } from '../database/schemas/devices';
import { Devices } from '../../domain/devices/devices';
import { DevicesWriteRepository } from '../../application/repositories/DevicesRepository';

const db_map = {
  db_to_app(devices_raw: DevicesRaw): Devices {
    return new Devices(
      devices_raw.imei,
      devices_raw._id.toString(),
      devices_raw.user_id,
    );
  },
  app_to_db(devices: Devices): DevicesRaw {
    return {
      imei: devices.IMEI,
      _id: new ObjectId(devices.id),
      user_id: devices.user_id,
    };
  },
};

export class DevicesWriteRepo implements DevicesWriteRepository {
  async save(devices: Devices) {
    const devices_col =
      await MongodbCollectionFactory.devices_collection();
    const devices_id = new ObjectId(devices.id);
    await devices_col.findOneAndUpdate(
      { _id: devices_id },
      { $set: db_map.app_to_db(devices) },
      { upsert: true },
    );
  }

  async restore(user_id: string): Promise<Devices[] | null> {
    const devices_col =
      await MongodbCollectionFactory.devices_collection();
    const devices_cursor = devices_col.find({ user_id: user_id });

    const devices_raw_array = await devices_cursor.toArray();

    if (!devices_raw_array || devices_raw_array.length === 0) return null;

    const devices = devices_raw_array.map(db_map.db_to_app);
    return devices;
  }
}
