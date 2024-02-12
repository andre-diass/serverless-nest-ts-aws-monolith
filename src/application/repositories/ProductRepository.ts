import { Product } from '../domain/product/Product';

export interface ProductWriteRepository {
  save(product: Product): Promise<void>;
  //   restore(product_id: string): Promise<Product | null>;
  //   delete(product: Product): Promise<void>;
}
