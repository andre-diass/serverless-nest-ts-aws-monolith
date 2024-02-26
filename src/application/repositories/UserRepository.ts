import { User } from '../../domain/user/User';

export interface UserReadRepository {
  restore(user_id: string, account_id: string): Promise<User | null>;
}
