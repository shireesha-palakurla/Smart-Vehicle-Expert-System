
export enum Environment {
  CITY = 'City',
  HIGHWAY = 'Highway',
  HILLY = 'Hilly',
  RURAL = 'Rural',
  COASTAL = 'Coastal'
}

export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  ELECTRIC = 'EV',
  HYBRID = 'Hybrid'
}

export enum BodyType {
  SUV = 'SUV',
  SEDAN = 'Sedan',
  HATCHBACK = 'Hatchback',
  TRUCK = 'Truck',
  COUPE = 'Coupe'
}

export enum DemandLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

export interface Car {
  id: string;
  company: string;
  model: string;
  bodyType: BodyType;
  fuelType: FuelType;
  seats: number;
  priceRange: [number, number];
  environmentFit: Environment[];
  demandLevel: DemandLevel;
  resaleRating: number;
  imageUrl: string;
  galleryUrls: string[]; // Added for related images
}

export interface UserPreferences {
  budget: number;
  preferredCompany: string;
  preferredModel: string;
  preferredFuel: FuelType | 'Any';
  seats: number;
  primaryEnvironment: Environment;
  preferredDemand: DemandLevel | 'Any';
}

export interface RecommendationResult {
  car: Car;
  score: number;
  explanations: string[];
}

export interface IdentifiedCar {
  manufacturer: string;
  model: string;
  bodyType: BodyType;
  fuelType: string;
  color: string;
  estimatedPrice: string;
  confidence: number;
  designAnalysis: string;
}
