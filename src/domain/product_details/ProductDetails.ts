import { title } from 'radash';
import { Period } from '../value_objects/Period';
import { Dimensions } from '../value_objects/Dimensions';
import { ArtisanInfo } from '../value_objects/ArtisanInfo';

export const PRODUCT_TYPE_VALUES = [
  'WOOD_PRODUCTS',
  'ARTISANAL',
  'COSMETICS',
  'ORGANICS',
  'PLANTS_AND_SEEDS',
] as const;

export type ProductType = (typeof PRODUCT_TYPE_VALUES)[number];

interface ProductDetails<T extends ProductType> {
  product_type: T;
}

export class WoodProducts implements ProductDetails<'WOOD_PRODUCTS'> {
  constructor(
    public product_type: 'WOOD_PRODUCTS',
    public category: string,
    public material: string,
    public dimensions: Dimensions,
    public weight: number,
    public sustainability_certification: string,
    public origin: string,
  ) {}

  static new(
    category: string,
    material: string,
    dimensions: Dimensions,
    weight: number,
    sustainability_certification: string,
    origin: string,
  ) {
    return new WoodProducts(
      'WOOD_PRODUCTS',
      category,
      material,
      dimensions,
      weight,
      sustainability_certification,
      origin,
    );
  }
}

export class Artisanal implements ProductDetails<'ARTISANAL'> {
  constructor(
    public product_type: 'ARTISANAL',
    public category: string,
    public material: string,
    public dimensions: Dimensions,
    public weight: number,
    public artisan_info: ArtisanInfo,
    public origin: string,
  ) {}

  static new(
    category: string,
    material: string,
    dimensions: Dimensions,
    weight: number,
    artisan_info: ArtisanInfo,
    origin: string,
  ) {
    return new Artisanal(
      'ARTISANAL',
      category,
      material,
      dimensions,
      weight,
      artisan_info,
      origin,
    );
  }
}

export class Cosmetics implements ProductDetails<'COSMETICS'> {
  constructor(
    public product_type: 'COSMETICS',
    public category: string,
    public ingredients: string[],
    public volume: string,
    public usage_instructions: string,
    public skin_type: string,
    public certification: string,
    public origin: string,
  ) {}

  static new(
    category: string,
    ingredients: string[],
    volume: string,
    usage_instructions: string,
    skin_type: string,
    certification: string,
    origin: string,
  ) {
    return new Cosmetics(
      'COSMETICS',
      category,
      ingredients,
      volume,
      usage_instructions,
      skin_type,
      certification,
      origin,
    );
  }
}

export class Organics implements ProductDetails<'ORGANICS'> {
  constructor(
    public product_type: 'ORGANICS',
    public category: string,
    public ingredients: string[],
    public weight_volume: string,
    public nutritional_information: string,
    public certification: string,
    public origin: string,
  ) {}

  static new(
    category: string,
    ingredients: string[],
    weight_volume: string,
    nutritional_information: string,
    certification: string,
    origin: string,
  ) {
    return new Organics(
      'ORGANICS',
      category,
      ingredients,
      weight_volume,
      nutritional_information,
      certification,
      origin,
    );
  }
}

export class PlantsAndSeeds implements ProductDetails<'PLANTS_AND_SEEDS'> {
  constructor(
    public product_type: 'PLANTS_AND_SEEDS',
    public category: string,
    public species_type: string,
    public growth_requirements: { sunlight: string; water: string },
    public planting_instructions: string,
    public certification: string,
    public origin: string,
  ) {}

  static new(
    category: string,
    species_type: string,
    growth_requirements: { sunlight: string; water: string },
    planting_instructions: string,
    certification: string,
    origin: string,
  ) {
    return new PlantsAndSeeds(
      'PLANTS_AND_SEEDS',
      category,
      species_type,
      growth_requirements,
      planting_instructions,
      certification,
      origin,
    );
  }
}

export type ProductDetailsVariant =
  | WoodProducts
  | Artisanal
  | Cosmetics
  | Organics
  | PlantsAndSeeds;
