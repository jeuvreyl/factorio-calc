import { Recipe, SimpleRecipe } from '../shared/recipe.model';
import { RecipeActionTypes, RecipesActions } from './recipe.actions';

export interface RecipesConfigState {
  recipes: Recipe[];
  selectedRecipes: SimpleRecipe[];
  isLoading: boolean;
  loaded: boolean;
}

export const initialState: RecipesConfigState = {
  recipes: [],
  selectedRecipes: [],
  isLoading: false,
  loaded: false
};

export function reducer(state = initialState, action: RecipesActions): RecipesConfigState {
  switch (action.type) {
    case RecipeActionTypes.LOAD_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.payLoad,
        isLoading: false,
        loaded: true
      };
    case RecipeActionTypes.LOAD_RECIPES_SUCCESS_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: false
      };
    case RecipeActionTypes.SELECT_RECIPE:
      return {
        ...state,
        selectedRecipes: [...state.selectedRecipes, Object.assign({}, action.payLoad)]
      };
    case RecipeActionTypes.DESELECT__RECIPE:
      return {
        ...state,
        selectedRecipes: state.selectedRecipes.filter(recipe => recipe.name !== action.payLoad.name)
      };
    default:
      return state;
  }
}
