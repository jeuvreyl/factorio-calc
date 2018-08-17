import { Recipe } from '../shared/recipe.model';
import { ItemRecipes } from './recipe.actions';

export interface RecipesConfigState {
  recipes: Recipe[];
  selectedRecipes: [];
}

export const initialState: RecipesConfigState = {
  recipes: [],
  selectedRecipes: [],
};

export function reducer(state = initialState, action: ItemRecipes): RecipesConfigState {
  switch (action.type) {
    default:
      return state;
  }
}
