// lib/location.ts
import { Country, State, City } from 'country-state-city';

export function getIvoryCoastStates() {
  return State.getStatesOfCountry('CI'); // Côte d'Ivoire
}

export function getCitiesByState(stateCode: string) {
  return City.getCitiesOfState('CI', stateCode);
}
