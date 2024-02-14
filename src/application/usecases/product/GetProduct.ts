import { z } from 'zod';
import { Command } from '../../Command';
import { Product } from '../../../domain/product/Product';
import { error } from 'console';

const input_schema = z.object({ product_id: z.string().min(0) });

type Input = z.infer<typeof input_schema>;
type Output = Product | null;

export class GetProduct extends Command {
  async execute(auth_data: string, input: Input): Promise<Output> {
    const { product_id } = await input_schema.parseAsync(input);
    const { write } = await this.repositories_factory.product_repository();
    const product = await write.restore(product_id);
    return product;
  }
}
