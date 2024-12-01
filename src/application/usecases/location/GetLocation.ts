import { z } from 'zod';
import { Command } from '../../Command';
import { LocationsRecord } from '../../../domain/locations_record/LocationRecord';
import { LocationsRecordNotFound } from '../../../errors/product';

const input_schema = z.object({
  imei: z.union([z.string(), z.number()]).transform((val) => Number(val)),
  reference_date: z.string(),
});
type Input = z.infer<typeof input_schema>;
type Output = LocationsRecord;

export class GetLocation extends Command {
  async execute(input: Input): Promise<Output> {
    const { imei, reference_date } = await input_schema.parseAsync(input);
    const { write } =
      await this.repositories_factory.locations_repository();
    const locations_record =
      await write.find_location_by_id_and_reference_date(
        imei,
        reference_date,
      );
    if (locations_record === null) throw new LocationsRecordNotFound();
    return locations_record;
  }
}
