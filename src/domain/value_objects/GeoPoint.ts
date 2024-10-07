import { GeoPointOffLimits } from '../../errors/geopoint';
import { Equals } from '../contracts';

export class GeoPoint implements Equals {
  constructor(
    readonly latitude: number,
    readonly longitude: number,
  ) {}

  equals(data: this): boolean {
    return (
      this.latitude === data.latitude && this.longitude === data.longitude
    );
  }

  static new(latitude: number, longitude: number) {
    if (
      latitude < -180 ||
      latitude > 180 ||
      longitude < -180 ||
      longitude > 180
    ) {
      throw new GeoPointOffLimits(latitude, longitude);
    }
    return new GeoPoint(latitude, longitude);
  }
}
