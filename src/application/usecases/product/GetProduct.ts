import { z } from 'zod';
import { Command } from '../../Command';
import { Product } from '../../../domain/product/Product';
import { AuthPayload } from '../../../nest/auth/auth.decorator';
import {
  ProductNotFound,
  UserDoestNotOwnProduct,
} from '../../../errors/product';
import { PType } from '../../repositories/ProductRepository';

const input_schema = z.object({ product_id: z.string().min(0) });

type Input = z.infer<typeof input_schema>;
type Output = PType | null;

export class GetProduct extends Command {
  async execute(auth_data: AuthPayload, input: Input): Promise<Output> {
    console.log(input);

    const { product_id } = await input_schema.parseAsync(input);
    const { write } = this.repositories_factory.product_repository();
    const product = await write.restore(product_id);
    if (product === null) throw new ProductNotFound();
    if (product?.owns_data(auth_data) === false)
      throw new UserDoestNotOwnProduct();
    return product;
  }
}
