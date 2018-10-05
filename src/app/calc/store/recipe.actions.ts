import { Action } from '@ngrx/store';
import { Recipe } from '../shared/recipe.model';

export enum RecipeActionTypes {
  ASK_ASSEMBLING_MACHINE = '[Recipe] Ask Assembling Machine',
  LOAD_RECIPES_SUCCESS = '[Recipe] Load Recipes Success',
  LOAD_RECIPES_SUCCESS_FAIL = '[Recipe] Load Recipes Fail',
  SELECT_RECIPE = '[Recipe] Select Recipe',
  DESELECT__RECIPE = '[Recipe] Deselect Recipe'
}

export class AskForAssemblingMachine implements Action {
  readonly type = RecipeActionTypes.ASK_ASSEMBLING_MACHINE;

  constructor(public payLoad: { recipeName: string }) {}
}

export class LoadRecipesSuccess implements Action {
  readonly type = RecipeActionTypes.LOAD_RECIPES_SUCCESS;

  constructor(public payLoad: { [name: string]: Recipe }) {}
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
