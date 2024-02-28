import { Product } from '../../domain/product/Product';
import { AuthPayload } from '../../nest/auth/auth.decorator';

export interface ProductWriteRepository {
  save(product: Product): Promise<void>;
  //   delete(product: Product): Promise<void>;
}
export interface ProductReadRepository {
  restore(product_id: string): Promise<Product | null>;
  is_product_unique(auth: AuthPayload, product: Product): Promise<boolean>;
}
