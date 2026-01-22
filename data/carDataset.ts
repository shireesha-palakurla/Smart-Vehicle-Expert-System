
import { Car, BodyType, FuelType, Environment, DemandLevel } from '../types';

export const CAR_DATASET: Car[] = [
  {
    id: '1',
    company: 'Tata',
    model: 'Curvv EV',
    bodyType: BodyType.SUV,
    fuelType: FuelType.ELECTRIC,
    seats: 5,
    priceRange: [1750000, 2200000],
    environmentFit: [Environment.CITY, Environment.HIGHWAY, Environment.COASTAL],
    demandLevel: DemandLevel.HIGH,
    resaleRating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1721332150382-d4114ee27efe?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1721332150382-d4114ee27efe?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1651515024467-33e38714ba36?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '2',
    company: 'Mahindra',
    model: 'Thar Roxx (5-Door)',
    bodyType: BodyType.SUV,
    fuelType: FuelType.DIESEL,
    seats: 5,
    priceRange: [1299000, 2049000],
    environmentFit: [Environment.HILLY, Environment.RURAL, Environment.HIGHWAY],
    demandLevel: DemandLevel.HIGH,
    resaleRating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1469033022973-896f011d3750?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '3',
    company: 'Maruti Suzuki',
    model: 'Swift 2025',
    bodyType: BodyType.HATCHBACK,
    fuelType: FuelType.PETROL,
    seats: 5,
    priceRange: [649000, 964000],
    environmentFit: [Environment.CITY],
    demandLevel: DemandLevel.HIGH,
    resaleRating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '4',
    company: 'Toyota',
    model: 'Fortuner Leader',
    bodyType: BodyType.SUV,
    fuelType: FuelType.DIESEL,
    seats: 7,
    priceRange: [3800000, 5400000],
    environmentFit: [Environment.HIGHWAY, Environment.RURAL, Environment.CITY],
    demandLevel: DemandLevel.HIGH,
    resaleRating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '5',
    company: 'Hyundai',
    model: 'Creta N Line',
    bodyType: BodyType.SUV,
    fuelType: FuelType.PETROL,
    seats: 5,
    priceRange: [1682000, 2045000],
    environmentFit: [Environment.CITY, Environment.HIGHWAY],
    demandLevel: DemandLevel.MEDIUM,
    resaleRating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '6',
    company: 'BYD',
    model: 'Atto 3',
    bodyType: BodyType.SUV,
    fuelType: FuelType.ELECTRIC,
    seats: 5,
    priceRange: [2499000, 3399000],
    environmentFit: [Environment.CITY, Environment.COASTAL],
    demandLevel: DemandLevel.MEDIUM,
    resaleRating: 3,
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '7',
    company: 'Mahindra',
    model: 'XUV700 (2025 Ed.)',
    bodyType: BodyType.SUV,
    fuelType: FuelType.DIESEL,
    seats: 7,
    priceRange: [1449000, 2699000],
    environmentFit: [Environment.HIGHWAY, Environment.CITY, Environment.HILLY],
    demandLevel: DemandLevel.HIGH,
    resaleRating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '8',
    company: 'Honda',
    model: 'City e:HEV',
    bodyType: BodyType.SEDAN,
    fuelType: FuelType.HYBRID,
    seats: 5,
    priceRange: [1900000, 2050000],
    environmentFit: [Environment.CITY, Environment.HIGHWAY],
    demandLevel: DemandLevel.MEDIUM,
    resaleRating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1606148383401-447029524022?auto=format&fit=crop&q=80&w=800',
    galleryUrls: [
      'https://images.unsplash.com/photo-1606148383401-447029524022?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1494806812796-244fe51b774d?auto=format&fit=crop&q=80&w=800'
    ]
  }
];
