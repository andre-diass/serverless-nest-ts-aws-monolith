import { z } from 'zod';
import { Command } from '../../Command';
import { Product } from '../../../domain/product/Product';
import { AuthPayload } from '../../../nest/auth/auth.decorator';
import {
  ProductNotFound,
  UserDoestNotOwnProduct,
} from '../../../errors/product';

const input_schema = z.object({ product_id: z.string().min(0) });

type Input = z.infer<typeof input_schema>;
type Output = Product | null;

export class GetProduct extends Command {
  async execute(auth_data: AuthPayload, input: Input): Promise<Output> {
    const { product_id } = await input_schema.parseAsync(input);
    const { read } = this.repositories_factory.product_repository();
    const product = await read.restore(product_id);
    if (product === null) throw new ProductNotFound();
    if (product?.owns_data(auth_data) === false)
      throw new UserDoestNotOwnProduct();
    return product;
  }
}
