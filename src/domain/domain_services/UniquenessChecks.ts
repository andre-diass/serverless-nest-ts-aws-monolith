// import { Command } from '../../application/Command';
// import { AuthPayload } from '../../nest/auth/auth.decorator';
// import { Product } from '../product/Product';
//
// interface CheckUniqueness<T> {
//   check_uniqueness(auth: AuthPayload, new_item: T): Promise<boolean>;
// }
//
// export class CheckProductUniqueness
//   extends Command
//   implements CheckUniqueness<Product>
// {
//   async check_uniqueness(auth: AuthPayload, product: Product) {
//     const { read } = this.repositories_factory.product_repository();
//
//     const is_unique = await read.is_product_unique(auth, product);
//     return is_unique;
//   }
// }
