import { Recipe } from '../shared/recipe.model';
import { RecipeActionTypes, RecipesActions } from './recipe.actions';
import { createSelector } from '@ngrx/store';

export interface RecipesConfigState {
  recipes: {[name: string]: Recipe};
  selectedRecipes: string[];
  isLoading: boolean;
  loaded: boolean;
}

export const initialState: RecipesConfigState = {
  recipes: {},
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
        selectedRecipes: [...state.selectedRecipes, action.payLoad]
      };
    case RecipeActionTypes.DESELECT__RECIPE:
      return {
        ...state,
        selectedRecipes: state.selectedRecipes.filter(recipe => recipe !== action.payLoad)
      };
    default:
      return state;
  }
}

export const getRecipes = (store: RecipesConfigState) => store.recipes;
export const getAllRecipes = (store: RecipesConfigState) => Object.keys(store.recipes).map(key => store.recipes[key]);
export const getSelectedRecipes = (store: RecipesConfigState) => store.selectedRecipes;


export const getSelectableRecipes = createSelector(
  getAllRecipes,
  getSelectedRecipes,
  (recipes, selectedRecipes) => {
    return recipes.filter(recipe => !selectedRecipes.includes(recipe.name));
  }
);
