import { MongoClientOptions } from 'mongodb';
import { MongodbConnection } from '../database/MongodbConnection';
import { ProductRaw } from '../database/schemas/product';

export class MongodbCollectionFactory {
  static MONGODB_OPTS: MongoClientOptions = {};
  static async products_collection() {
    const conn = await MongodbConnection.connection(
      process.env.MONGODB_URI as string,
      this.MONGODB_OPTS,
    );
    return conn.db().collection<ProductRaw>('products');
  }
}
