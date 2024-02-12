import { MongoClient, MongoClientOptions } from 'mongodb';

export class MongodbConnection {
  private static _connection?: MongoClient;
  private constructor() {}

  static async connection(
    uri: string,
    opts?: MongoClientOptions,
  ): Promise<MongoClient> {
    if (MongodbConnection._connection) {
      return MongodbConnection._connection;
    }

    MongodbConnection._connection = new MongoClient(uri, opts);
    return MongodbConnection._connection;
  }
}
