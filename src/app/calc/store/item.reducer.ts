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
            iconUrl: 'https://wiki.factorio.com/images/Factorio-icon.png'
          }
        ]
      };
    case ItemActionTypes.SELECT_ITEM:
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payLoad]
      };
    case ItemActionTypes.DESELECT_ITEM:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}
