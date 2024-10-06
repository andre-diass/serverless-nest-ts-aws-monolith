import { DomainError } from './base';

export class GeoPointOffLimits extends DomainError {
  constructor(latitude: number, longitude: number) {
    super(
      'GeoPoint:OffLimits',
      `O ponto geográfico passado está fora dos limites. Input GeoPoint{${latitude}, ${longitude}}`,
    );
  }
}
