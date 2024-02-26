import { Product } from '../../domain/product/Product';

export interface ProductWriteRepository {
  save(product: Product): Promise<void>;
  //   delete(product: Product): Promise<void>;
}
export interface ProductReadRepository {
  restore(product_id: string): Promise<Product | null>;
}
