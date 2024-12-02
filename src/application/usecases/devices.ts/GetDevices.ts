import { z } from 'zod';
import { Command } from '../../Command';
import { LocationsRecord } from '../../../domain/locations_record/LocationRecord';
import { LocationsRecordNotFound } from '../../../errors/product';

const input_schema = z.object({
  user_id: z.string(),
});
type Input = z.infer<typeof input_schema>;
// type Output = LocationsRecord;

export class GetDevices extends Command {
  async execute(input: Input): Promise<any> {
    const { user_id } = await input_schema.parseAsync(input);
    const { write } = await this.repositories_factory.devices_repository();
    const devices = await write.restore(user_id);
    console.log(devices);

    // if (devices === null) throw new LocationsRecordNotFound();
    return devices;
  }
}
