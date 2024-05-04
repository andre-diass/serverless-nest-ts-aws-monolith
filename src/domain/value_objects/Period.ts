import { PeriodInvalidRange } from '../../errors/period';

export class Period {
  constructor(
    readonly start: Date,
    readonly end: Date,
  ) {}

  static new(start: Date, end: Date) {
    if (start.getTime() >= end.getTime()) throw new PeriodInvalidRange();
    return new Period(start, end);
  }
}
