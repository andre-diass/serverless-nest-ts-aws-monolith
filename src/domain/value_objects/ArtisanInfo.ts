export class ArtisanInfo {
  constructor(
    public name: string,
    public community: string,
    public cultural_significance: string,
  ) {}

  static new(
    name: string,
    community: string,
    cultural_significance: string,
  ) {
    return new ArtisanInfo(name, community, cultural_significance);
  }
}
