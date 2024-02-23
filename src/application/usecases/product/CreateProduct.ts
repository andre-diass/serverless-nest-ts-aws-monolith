import { z } from 'zod';
import { Product } from '../../../domain/product/Product';
import { Command } from '../../Command';

const input_schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  //   userId: z.string(),
  category: z.string().min(1),
});

type Input = z.infer<typeof input_schema>;
type Output = Product;

export class CreateProduct extends Command {
  async execute(auth_data: any, input: Input): Promise<Output> {
    const { name, description, price, category } =
      await input_schema.parseAsync(input);
    const new_product = Product.new(
      'user',
      description,
      price,
      category,
      name,
    );
    const { write } = this.repositories_factory.product_repository();
    await write.save(new_product);
    return new_product;
  }
}
