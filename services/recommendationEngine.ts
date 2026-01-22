
import { Car, UserPreferences, RecommendationResult, Environment, FuelType, DemandLevel } from '../types';
import { CAR_DATASET } from '../data/carDataset';

const WEIGHTS = {
  BUDGET: 0.25,
  ENVIRONMENT: 0.15,
  FUEL: 0.15,
  COMPANY_MODEL: 0.20,
  DEMAND: 0.15,
  SEATING: 0.10
};

export const getRecommendations = (prefs: UserPreferences): RecommendationResult[] => {
  const results = CAR_DATASET.map(car => {
    let explanations: string[] = [];

    // 1. Budget Match
    const avgPrice = (car.priceRange[0] + car.priceRange[1]) / 2;
    const budgetScore = avgPrice <= prefs.budget ? 1 : Math.max(0, 1 - (avgPrice - prefs.budget) / 2000000);
    if (avgPrice <= prefs.budget) {
      explanations.push(`Fits perfectly within your ₹${prefs.budget.toLocaleString('en-IN')} budget.`);
    }

    // 2. Environment Suitability
    const isEnvMatch = car.environmentFit.includes(prefs.primaryEnvironment);
    const envScore = isEnvMatch ? 1 : 0.4;
    if (isEnvMatch) explanations.push(`Designed for ${prefs.primaryEnvironment} driving.`);

    // 3. Fuel Compatibility
    const fuelMatch = prefs.preferredFuel === 'Any' || car.fuelType === prefs.preferredFuel;
    const fuelScore = fuelMatch ? 1 : 0.2;
    if (fuelMatch && prefs.preferredFuel !== 'Any') explanations.push(`Matches your ${car.fuelType} preference.`);

    // 4. Company & Model Match
    let cmScore = 0.5;
    const companyMatch = prefs.preferredCompany.toLowerCase() === '' || car.company.toLowerCase().includes(prefs.preferredCompany.toLowerCase());
    const modelMatch = prefs.preferredModel.toLowerCase() === '' || car.model.toLowerCase().includes(prefs.preferredModel.toLowerCase());
    
    if (companyMatch && modelMatch && (prefs.preferredCompany || prefs.preferredModel)) {
      cmScore = 1;
      explanations.push(`Highly relevant match for your interest in ${car.company}.`);
    } else if (companyMatch && prefs.preferredCompany) {
      cmScore = 0.8;
      explanations.push(`Great option from your preferred brand, ${car.company}.`);
    }

    // 5. Market Demand
    const demandScore = prefs.preferredDemand === 'Any' || car.demandLevel === prefs.preferredDemand ? 1 : 0.5;
    if (car.demandLevel === DemandLevel.HIGH) explanations.push(`Currently in high market demand.`);

    // 6. Seating Match
    const seatingScore = car.seats >= prefs.seats ? 1 : Math.max(0, 1 - (prefs.seats - car.seats) / 5);
    if (car.seats >= prefs.seats) explanations.push(`Provides the required ${prefs.seats}+ seat capacity.`);

    const finalScore = (
      budgetScore * WEIGHTS.BUDGET +
      envScore * WEIGHTS.ENVIRONMENT +
      fuelScore * WEIGHTS.FUEL +
      cmScore * WEIGHTS.COMPANY_MODEL +
      demandScore * WEIGHTS.DEMAND +
      seatingScore * WEIGHTS.SEATING
    );

    return {
      car,
      score: Math.round(finalScore * 100),
      explanations
    };
  });

  return results.sort((a, b) => b.score - a.score);
};
