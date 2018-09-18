import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { MatDialog } from '../../../../node_modules/@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { AskItemQuantiy, ItemActionTypes, AskForItemRecipe } from './item.actions';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, private dialog: MatDialog) {}

  @Effect({ dispatch: false })
  askForItemQuantity$ = this.actions$.pipe(
    ofType<AskItemQuantiy>(ItemActionTypes.ASK_ITEM_QUANTY),
    map(action => action.payLoad),
    map(item =>
      this.dialog.open(ItemDialogComponent, {
        width: '250px',
        data: { item: item }
      })
    )
  );

  @Effect({ dispatch: false })
  askForItemRecipe$ = this.actions$.pipe(
    ofType<AskForItemRecipe>(ItemActionTypes.ASK_ITEM_RECIPE),
    map(action => action.payLoad),
    map(items =>
      this.dialog.open(RecipeDialogComponent, {
        width: '250px',
        data: { items: items }
      })
    )
  );
}
