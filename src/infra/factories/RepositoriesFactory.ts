import {
  ProductReadRepo,
  ProductWriteRepo,
} from '../repositories/ProductRepositoryDB';
import { UserReadRepo } from '../repositories/UserRepositoryDB';

export class RepositoriesFactory {
  user_repository() {
    return { read: new UserReadRepo() };
  }

  product_repository() {
    return {
      write: new ProductWriteRepo(),
      read: new ProductReadRepo(),
    };
  }
}
