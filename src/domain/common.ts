export const UNIT_OF_MEASUREMENT = [
  //mass
  'kg',
  //distance
  'm',
  //volume
  'oz',
  'litros',
  'm³',
  //other
  'un',
  'sacas',
  'unidades',
  'maços',
] as const;
export type UnitOfMeasurement = (typeof UNIT_OF_MEASUREMENT)[number];
