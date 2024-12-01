import { MongoClientOptions } from 'mongodb';
import { MongodbConnection } from '../database/MongodbConnection';
import { LocationsRecordRaw } from '../database/schemas/location';
import { UserRaw } from '../database/schemas/user';
import { AccountRaw } from '../database/schemas/account';
import { DevicesRaw } from '../database/schemas/devices';

export class MongodbCollectionFactory {
  static MONGODB_OPTS: MongoClientOptions = {};
  static async locations_collection() {
    const conn = await MongodbConnection.connection(
      process.env.MONGODB_URI as string,
      this.MONGODB_OPTS,
    );
    return conn.db().collection<LocationsRecordRaw>('locations');
  }

  static async devices_collection() {
    const conn = await MongodbConnection.connection(
      process.env.MONGODB_URI as string,
      this.MONGODB_OPTS,
    );
    return conn.db().collection<DevicesRaw>('devices');
  }

  static async users_collection() {
    const conn = await MongodbConnection.connection(
      process.env.MONGODB_URI as string,
      this.MONGODB_OPTS,
    );
    return conn.db().collection<UserRaw>('users');
  }

  static async accounts_collection() {
    const conn = await MongodbConnection.connection(
      process.env.MONGODB_URI as string,
      this.MONGODB_OPTS,
    );
    return conn.db().collection<AccountRaw>('accounts');
  }
}
