import { Action } from '@ngrx/store';
import { Item } from '../shared/item.model';
import { Recipe } from '../shared/recipe.model';

export enum RecipeActionTypes {
  LOAD_RECIPES_SUCCESS = '[Item] Load Recipes Success',
  LOAD_RECIPES_SUCCESS_FAIL = '[Item] Load Recipes Fail',
  SELECT_RECIPE = '[Item] Select Recipe',
  DESELECT__RECIPE = '[Item] Deselect Recipe'
}

export class LoadRecipesSuccess implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPES_SUCCESS;

  constructor(public payLoad: {[name: string]: Recipe}) {}
}

export class LoadRecipesFail implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPES_SUCCESS_FAIL;
}

export class SelectRecipe implements Action {
  readonly type = RecipeActionTypes.SELECT_RECIPE;

  constructor(public payLoad: string) {}
}

export class DeselecRecipe implements Action {
  readonly type = RecipeActionTypes.DESELECT__RECIPE;

  constructor(public payLoad: string) {}
}

export type RecipesActions = LoadRecipesSuccess | LoadRecipesFail | SelectRecipe | DeselecRecipe;
