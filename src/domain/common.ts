export const UNITS_OF_DISTANCE = ['m', 'km'] as const;
export type UnitOfMeasurement = (typeof UNITS_OF_DISTANCE)[number];
