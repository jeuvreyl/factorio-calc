import { createSelector } from '@ngrx/store';
import { Item, QuantifiedItem } from '../shared/item.model';
import { ItemActions, ItemActionTypes } from './item.actions';

export interface ItemsConfigState {
  items: {[name: string]: Item};
  selectedItems: QuantifiedItem[];
  isLoading: boolean;
  loaded: boolean;
}

export const initialState: ItemsConfigState = {
  items: {},
  selectedItems: [],
  isLoading: false,
  loaded: false
};

export function reducer(state = initialState, action: ItemActions): ItemsConfigState {
  switch (action.type) {
    case ItemActionTypes.LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.payLoad,
        isLoading: false,
        loaded: true
      };
    case ItemActionTypes.LOAD_ITEMS_SUCCESS_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: false
      };
    case ItemActionTypes.SELECT_ITEM:
      return {
        ...state,
        selectedItems: [...state.selectedItems, Object.assign({}, action.payLoad)]
      };
    case ItemActionTypes.DESELECT_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(item => item.name !== action.payLoad.name)
      };
    default:
      return state;
  }
}

export const getItems = (store: ItemsConfigState) => store.items;
export const getAllItems = (store: ItemsConfigState) => Object.keys(store.items).map(key => store.items[key]);
export const getSelectedItems = (store: ItemsConfigState) => store.selectedItems;
export const getSelectableItems = createSelector(
  getAllItems,
  getSelectedItems,
  (items, selectedItems) => {
    const selectedNames = selectedItems.map(selectedItem => selectedItem.name);
    return items.filter(item => !selectedNames.includes(item.name));
  }
);
