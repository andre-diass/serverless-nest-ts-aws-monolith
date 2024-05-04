import { z, ZodRawShape } from 'zod';
import { Product } from '../../../domain/product/Product';
import { AuthPayload } from '../../../nest/auth/auth.decorator';
import { ProductAlreadyRegistered } from '../../../errors/product';
import {
  Artisanal,
  PRODUCT_TYPE_VALUES,
  ProductDetailsVariant,
  ProductType,
  WoodProducts,
} from '../../../domain/product_details/ProductDetails';
import { ObjectId } from 'mongodb';
import { UNIT_OF_MEASUREMENT } from '../../../domain/common';
import { Command } from '../../Command';

const common_defintions = {
  id: z.string().refine(ObjectId.isValid),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  unit_of_measurement: z.enum(UNIT_OF_MEASUREMENT),
};

function create_unified_schema<T extends ZodRawShape>(
  product_type: ProductType,
  definitions: T,
) {
  return z.object({
    ...common_defintions,
    product_type: z.literal(product_type),
    details: z.object({ ...definitions }),
  });
}

const wood_products_schema = create_unified_schema('WOOD_PRODUCTS', {
  category: z.string(),
  material: z.string(),
  dimensions: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  weight: z.number(),
  sustainability_certification: z.string(),
  origin: z.string(),
});

const artisanal_schema = create_unified_schema('ARTISANAL', {
  category: z.string(),
  material: z.string(),
  dimensions: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  weight: z.number(),
  artisan_info: z.object({
    name: z.string(),
    community: z.string(),
    cultural_significance: z.string(),
  }),
  origin: z.string(),
});

const unified_schema = z.object({
  payload: z.discriminatedUnion('product_type', [
    wood_products_schema,
    artisanal_schema,
  ]),
});

type Input = z.infer<typeof unified_schema>;
type Output = Product<ProductDetailsVariant, ProductType>;

export class CreateProduct extends Command {
  private async map_wood_products(
    input: z.infer<typeof wood_products_schema>,
  ) {
    const payload = await wood_products_schema.parseAsync(input);
    return WoodProducts.new(
      payload.details.category,
      payload.details.material,
      payload.details.dimensions,
      payload.details.weight,
      payload.details.sustainability_certification,
      payload.details.origin,
    );
  }

  // private map_artisanal(input: Input){
  //   return Artisanal.new(input.payload.details.)
  // }

  private async map_details({ payload }: Input) {
    let product_details: ProductDetailsVariant;

    switch (payload.product_type) {
      case 'WOOD_PRODUCTS':
        product_details = await this.map_wood_products(payload);
        break;
      // case 'ARTISANAL':
      //   product_details = this.map_artisanal(input);
      //   break;
      default:
        break;
    }
    return product_details;
  }

  async execute(auth_data: AuthPayload, input: Input): Promise<any> {
    const { payload } = await unified_schema.parseAsync(input);

    const details = this.map_details(input);

    const { write } = this.repositories_factory.product_repository();
  }
}
/*

const check_product_uniqueness = new CheckProductUniqueness(
      this.repositories_factory, );

const is_unique = await check_product_uniqueness.check_uniqueness(
      auth_data,
      new_product,
    );
    if (is_unique === false) throw new ProductAlreadyRegistered();
    
    await write.save(new_product);
    return new_product;
*/
