import { Action } from '@ngrx/store';
import { Item, QuantifiedItem } from '../shared/item.model';

export enum ItemActionTypes {
  ASK_ITEM_QUANTY = '[Item] Ask Item Quantity',
  ASK_ITEM_RECIPE = '[Item] Ask Item Recipe',
  LOAD_ITEMS_SUCCESS = '[Item] Load Items Success',
  LOAD_ITEMS_SUCCESS_FAIL = '[Item] Load Items Fail',
  SELECT_ITEM = '[Item] Select Item',
  DESELECT_ITEM = '[Item] Deselect Item'
}

export class AskItemQuantiy implements Action {
  readonly type = ItemActionTypes.ASK_ITEM_QUANTY;

  constructor(public payLoad: Item) {}
}

export class AskForItemRecipe implements Action {
  readonly type = ItemActionTypes.ASK_ITEM_RECIPE;

  constructor(public payLoad: Item[]) {}
}

export class LoadItemsSuccess implements Action {
  readonly type = ItemActionTypes.LOAD_ITEMS_SUCCESS;

  constructor(public payLoad: Item[]) {}
}

export class LoadItemsFail implements Action {
  readonly type = ItemActionTypes.LOAD_ITEMS_SUCCESS_FAIL;
}

export class SelectItem implements Action {
  readonly type = ItemActionTypes.SELECT_ITEM;

  constructor(public payLoad: QuantifiedItem) {}
}

export class DeselectItem implements Action {
  readonly type = ItemActionTypes.DESELECT_ITEM;

  constructor(public payLoad: Item) {}
}

export type ItemActions =
  | AskItemQuantiy
  | AskForItemRecipe
  | LoadItemsSuccess
  | LoadItemsFail
  | SelectItem
  | DeselectItem;
