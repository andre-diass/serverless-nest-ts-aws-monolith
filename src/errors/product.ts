import { DomainError, NotFoundError } from './base';

export class LocationsRecordNotFound extends NotFoundError {
  constructor(context?: string) {
    super('Locations:NotFound', 'Locations not found', context);
  }
}

export class ProductAlreadyRegistered extends DomainError {
  constructor(context?: string) {
    super('Product:AlreadyRegistered', 'Produto já cadastrado', context);
  }
}

export class UserDoestNotOwnProduct extends DomainError {
  constructor(context?: string) {
    super('Product:InvalidUser', 'Usuário inválido', context);
  }
}
