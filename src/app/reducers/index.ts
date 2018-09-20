import { ActionReducerMap, MetaReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromItem from '../calc/store/item.reducer';
import * as fromRecipe from '../calc/store/recipe.reducer';

export interface State {
  itemsConfig: fromItem.ItemsConfigState;
  recipesConfig: fromRecipe.RecipesConfigState;
}

export const reducers: ActionReducerMap<State> = {
  itemsConfig: fromItem.reducer,
  recipesConfig: fromRecipe.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectItemState = createFeatureSelector<fromItem.ItemsConfigState>('itemsConfig');
export const selectRecipeState = createFeatureSelector<fromRecipe.RecipesConfigState>('recipesConfig');

export const getItems = createSelector(selectItemState, fromItem.getItems);
export const getAllItems = createSelector(selectItemState, fromItem.getAllItems);
export const getSelectedItems = createSelector(selectItemState, fromItem.getSelectedItems);
export const getSelectableItems = createSelector(selectItemState, fromItem.getSelectableItems);

export const getRecipes = createSelector(selectRecipeState, fromRecipe.getRecipes);
export const getAllIRecipes = createSelector(selectRecipeState, fromRecipe.getAllRecipes);
export const getSelectedRecipes = createSelector(selectRecipeState, fromRecipe.getSelectedRecipes);
export const getSelectableRecipes = createSelector(selectRecipeState, fromRecipe.getSelectableRecipes);
