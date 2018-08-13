import { Item } from '../shared/item.model';
import { ItemActionTypes, ItemActions } from './item.actions';

export interface ItemsConfigState {
  items: Item[];
  selectedItems: Item[];
  isLoading: boolean;
}

export const initialState: ItemsConfigState = {
  items: [],
  selectedItems: [],
  isLoading: false
};

export function reducer(state = initialState, action: ItemActions): ItemsConfigState {
  switch (action.type) {
    case ItemActionTypes.LOAD_ITEMS:
      return {
        ...state,
        items: [
          {
            id: 'test',
            name: 'test item',
            iconUrl: 'https://wiki.factorio.com/images/Factorio-icon.png',
            quantity: 0
          }
        ]
      };
    case ItemActionTypes.SELECT_ITEM:
      return {
        ...state,
        selectedItems: [...state.selectedItems, Object.assign({}, action.payLoad)],
        items: state.items.filter(item => item.id !== action.payLoad.id)
      };
    case ItemActionTypes.DESELECT_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(item => item.id !== action.payLoad.id),
        items: [...state.items, Object.assign({}, action.payLoad)]
      };
    default:
      return state;
  }
}
