import { DomainError, NotFoundError } from './base';

export class UserCannotBeDisabled extends DomainError {
  constructor(context?: string) {
    super('Users:CannotBeDisabled', 'User cannot be disabled', context);
  }
}

export class UserNotFound extends NotFoundError {
  constructor(context?: string) {
    super('Users:NotFound', 'User not found', context);
  }
}

export class Unauthorized extends NotFoundError {
  constructor(context?: string) {
    super('Authentication:ErrorOnToken', 'Token error', context);
  }
}
