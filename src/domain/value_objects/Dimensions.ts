export class Dimensions {
  constructor(
    public length: number,
    public width: number,
    public height: number,
  ) {}

  static new(length: number, width: number, height: number) {
    return new Dimensions(length, width, height);
  }
}
