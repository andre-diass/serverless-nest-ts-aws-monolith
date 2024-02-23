import { ProductWriteRepo } from '../repositories/ProductRepositoryDB';

export class RepositoriesFactory {
  user_repository() {
    // return new UserRepositoryDB();
  }

  product_repository() {
    return {
      write: new ProductWriteRepo(),
      //   read: new ProductReadRepo(),
    };
  }
}
