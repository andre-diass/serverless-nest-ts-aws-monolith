import { ObjectId } from 'mongodb';
import { Product } from '../../domain/product/Product';
import { ProductWriteRepository } from '../../application/repositories/ProductRepository';
import { ProductRaw } from '../database/schemas/product';
import { DbMap } from './interfaces';
import { MongodbCollectionFactory } from '../factories/MongodbCollectionFactory';

const db_map: DbMap<ProductRaw, Product> = {
  app_to_db(product: Product): ProductRaw {
    return {
      _id: new ObjectId(product.id),
      user_id: new ObjectId(product.user_id),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      created_at: product.created_at,
    };
  },
  db_to_app(product_raw: ProductRaw): Product {
    return new Product(
      product_raw._id.toString(),
      product_raw.user_id.toString(),
      product_raw.name,
      product_raw.description,
      product_raw.price,
      product_raw.category,
      product_raw.created_at,
    );
  },
};

export class ProductWriteRepo implements ProductWriteRepository {
  async save(product: Product) {
    const products_col =
      await MongodbCollectionFactory.products_collection();
    const product_id = new ObjectId(product.id);
    await products_col.findOneAndUpdate(
      { _id: product_id },
      { $set: db_map.app_to_db(product) },
      { upsert: true },
    );
  }
  async restore(product_id: string): Promise<Product | null> {
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
