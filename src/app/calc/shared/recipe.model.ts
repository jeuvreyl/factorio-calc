import { SimpleQuantifiedItem } from './item.model';

export interface RecipeObject {
  id: string;
  name: string;
  iconUrl: string;
  ingredients: Array<SimpleQuantifiedItem>;
  results: Array<SimpleQuantifiedItem>;
  energyRequired: number;
  subGroup: string;
}

export type Recipe = Readonly<RecipeObject>;
export type SimpleRecipe = Pick<RecipeObject, 'name' | 'iconUrl'>;
