import { Item } from './item.model';

export interface Recipe {
  id: string;
  name: string;
  iconUrl: string;
  ingredients: string[];
  results: string[];
  energyRequired: number;
  category: string;
}
