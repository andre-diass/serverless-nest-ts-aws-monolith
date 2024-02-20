import { DomainError, NotFoundError } from './base';

export class ProductNotFound extends NotFoundError {
  constructor(context?: string) {
    super('Product:NotFound', 'Product not found', context);
  }
}

export class ProductAlreadyRegistered extends DomainError {
  constructor(context?: string) {
    super('Product:AlreadyRegistered', 'Produto já cadastrado', context);
  }
}
