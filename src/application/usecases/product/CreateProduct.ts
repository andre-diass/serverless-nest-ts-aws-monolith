import { z } from 'zod';
import { Product } from '../../../domain/product/Product';
import { Command } from '../../Command';
import { AuthPayload } from '../../../nest/auth/auth.decorator';
import { CheckProductUniqueness } from '../../../domain/domain_services/UniquenessChecks';
import { RepositoriesFactory } from '../../../infra/factories/RepositoriesFactory';
import { ProductAlreadyRegistered } from '../../../errors/product';

const input_schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  category: z.string().min(1),
});

type Input = z.infer<typeof input_schema>;
type Output = Product;

export class CreateProduct extends Command {
  async execute(auth_data: AuthPayload, input: Input): Promise<Output> {
    const { name, description, price, category } =
      await input_schema.parseAsync(input);
    const new_product = Product.new(
      auth_data,
      description,
      price,
      category,
      name,
    );
    const check_product_uniqueness = new CheckProductUniqueness(
      this.repositories_factory,
    );
    const is_unique = await check_product_uniqueness.check_uniqueness(
      auth_data,
      new_product,
    );
    if (is_unique === false) throw new ProductAlreadyRegistered();
    const { write } = this.repositories_factory.product_repository();
    await write.save(new_product);
    return new_product;
  }
}
