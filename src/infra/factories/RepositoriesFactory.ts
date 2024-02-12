import { ProductWriteRepo } from '../repositories/ProductRepositoryDB';

export class RepositoriesFactory {
  async user_repository() {
    // return new UserRepositoryDB();
  }

  async product_repository() {
    return {
      write: new ProductWriteRepo(),
      //   read: new ProductReadRepo(),
    };
  }
}
