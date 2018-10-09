import { SimpleQuantifiedItem } from './item.model';

interface RecipeObject {
  id: string;
  name: string;
  iconUrl: string;
  ingredients: Array<SimpleQuantifiedItem>;
  results: Array<SimpleQuantifiedItem>;
  energyRequired: number;
  groupName: string;
  craftingCategory: string;
}

export type Recipe = Readonly<RecipeObject>;
export type SimpleRecipe = Pick<RecipeObject, 'name' | 'iconUrl'>;
