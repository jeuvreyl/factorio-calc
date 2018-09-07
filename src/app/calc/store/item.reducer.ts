import { Item, SimpleItem } from '../shared/item.model';
import { ItemActionTypes, ItemActions } from './item.actions';

export interface ItemsConfigState {
  items: Item[];
  selectedItems: SimpleItem[];
  isLoading: boolean;
  loaded: boolean;
}

export const initialState: ItemsConfigState = {
  items: [],
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
