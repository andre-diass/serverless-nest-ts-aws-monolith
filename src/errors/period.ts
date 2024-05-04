import { DomainError } from './base';

export class PeriodInvalidRange extends DomainError {
  constructor() {
    super('Period:InvalidRange', 'Invalid date');
  }
}
