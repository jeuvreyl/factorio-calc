import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ItemsConfigState, reducer as itemReducer } from '../calc/store/item.reducer';
import { RecipesConfigState, reducer as RecipeReducer } from '../calc/store/recipe.reducer';

export interface State {
  itemsConfig: ItemsConfigState;
  recipesConfig: RecipesConfigState;
}

export const reducers: ActionReducerMap<State> = {
  itemsConfig: itemReducer,
  recipesConfig: RecipeReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
