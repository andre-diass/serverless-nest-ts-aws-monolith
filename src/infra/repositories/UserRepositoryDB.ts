import { ObjectId } from 'mongodb';
import { UserReadRepository } from '../../application/repositories/UserRepository';
import { MongodbCollectionFactory } from '../factories/MongodbCollectionFactory';
import { User } from '../../domain/user/User';
import { UserRaw } from '../database/schemas/user';
import { UserNotFound } from '../../errors/user';

const db_map = {
  dp_to_app(user_raw: UserRaw): User {
    return User.new(
      user_raw._id.toString(),
      user_raw.name,
      user_raw.image,
      user_raw.email,
      user_raw.emailVerified,
    );
  },
};

export class UserReadRepo implements UserReadRepository {
  async restore(
    user_id: string,
    account_id: string,
  ): Promise<User | null> {
    const user_col = await MongodbCollectionFactory.users_collection();
    const account_col =
      await MongodbCollectionFactory.accounts_collection();
    const account_raw = await account_col.findOne({
      providerAccountId: account_id,
    });
    if (account_raw === null) {
      return null;
    }
    const user_raw = await user_col.findOne({
      _id: new ObjectId(user_id),
    });
    if (user_raw === null) {
      return null;
    }
    const user = db_map.dp_to_app(user_raw);
    return user;
  }
}
