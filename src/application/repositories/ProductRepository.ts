import { Product } from '../../domain/product/Product';
import {
  ProductDetailsVariant,
  ProductType,
} from '../../domain/product_details/ProductDetails';
import { AuthPayload } from '../../nest/auth/auth.decorator';

export type PType = Product<ProductDetailsVariant, ProductType>;

export interface ProductWriteRepository {
  save(product: PType): Promise<void>;
  restore(product_id: string): Promise<PType | null>;
  //   delete(product: Product): Promise<void>;
}
export interface ProductReadRepository {
  is_product_unique(auth: AuthPayload, product: PType): Promise<boolean>;
}
