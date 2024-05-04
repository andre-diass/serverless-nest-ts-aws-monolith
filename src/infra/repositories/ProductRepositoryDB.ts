import { ObjectId } from 'mongodb';
import { Product } from '../../domain/product/Product';
import {
  ProductReadRepository,
  ProductWriteRepository,
  PType,
} from '../../application/repositories/ProductRepository';
import { ProductRaw } from '../database/schemas/product';
import { DbMap } from './interfaces';
import { MongodbCollectionFactory } from '../factories/MongodbCollectionFactory';
import { AuthPayload } from '../../nest/auth/auth.decorator';
import {
  Artisanal,
  ProductDetailsVariant,
  ProductType,
  WoodProducts,
} from '../../domain/product_details/ProductDetails';

function map_product_details(product_raw: ProductRaw) {
  let details: ProductDetailsVariant;
  switch (product_raw.product_type) {
    case 'WOOD_PRODUCTS':
      details = new WoodProducts(
        'WOOD_PRODUCTS',
        product_raw.details.category,
        product_raw.details.material,
        product_raw.details.dimensions,
        product_raw.details.weight,
        product_raw.details.sustainability_certification,
        product_raw.details.origin,
      );
      break;
    case 'ARTISANAL':
      details = new Artisanal(
        'ARTISANAL',
        product_raw.details.category,
        product_raw.details.material,
        product_raw.details.dimensions,
        product_raw.details.weight,
        product_raw.details.artisan_info,
        product_raw.details.origin,
      );
      break;
    default:
      throw new Error('Unknown product type');
  }
  return details;
}

const db_map: DbMap<ProductRaw, PType> = {
  app_to_db(product: PType): ProductRaw {
    return {
      _id: new ObjectId(product.id),
      user_id: new ObjectId(product.user_id),
      name: product.name,
      description: product.description,
      price: product.price,
      created_at: product.created_at,
      quantity: product.quantity,
      availability: product.availability,
      unit_of_measurement: product.unit_of_measurement,
      product_type: product.product_type as ProductType,
      details: product.details as unknown as any,
    };
  },
  db_to_app(product_raw: ProductRaw): PType {
    // const details = map_product_details(product_raw);
    return new Product(
      product_raw._id.toString(),
      product_raw.user_id.toString(),
      product_raw.name,
      product_raw.description,
      product_raw.price,
      product_raw.created_at,
      product_raw.quantity,
      product_raw.availability,
      product_raw.unit_of_measurement,
      product_raw.product_type as ProductType,
      product_raw.details,
    );
  },
};

export class ProductWriteRepo implements ProductWriteRepository {
  async save(product: PType) {
    const products_col =
      await MongodbCollectionFactory.products_collection();
    const product_id = new ObjectId(product.id);
    await products_col.findOneAndUpdate(
      { _id: product_id },
      { $set: db_map.app_to_db(product) },
      { upsert: true },
    );
  }

  async restore(product_id: string): Promise<PType | null> {
    const products_col =
      await MongodbCollectionFactory.products_collection();
    const product_raw = await products_col.findOne({
      _id: new ObjectId(product_id),
    });

    if (product_raw === null) return null;
    const product = db_map.db_to_app(product_raw);
    return product;
  }
}

export class ProductReadRepo implements ProductReadRepository {
  async is_product_unique(
    auth: AuthPayload,
    product: PType,
  ): Promise<boolean> {
    const product_col =
      await MongodbCollectionFactory.products_collection();

    const result = await product_col.findOne({
      user_id: new ObjectId(auth.id),
      name: product.name,
    });
    return result === null;
  }
}
