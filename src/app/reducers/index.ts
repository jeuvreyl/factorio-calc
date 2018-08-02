import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ItemsConfigState, reducer } from '../calc/store/item.reducer';

export interface State {
  itemsConfig: ItemsConfigState;
}

export const reducers: ActionReducerMap<State> = {
  itemsConfig: reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
