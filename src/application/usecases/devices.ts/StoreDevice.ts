import { Devices } from '../../../domain/devices/devices';
import { LocationsRecord } from '../../../domain/locations_record/LocationRecord';
import { GeoPoint } from '../../../domain/value_objects/GeoPoint';
import { Command } from '../../Command';

export class StoreDevice extends Command {
  async execute(payload: any): Promise<Devices> {
    const { write } = this.repositories_factory.devices_repository();
    console.log(payload);

    const device = Devices.new(payload.IMEI, payload.user_id);

    write.save(device);
    return device;
  }
}
