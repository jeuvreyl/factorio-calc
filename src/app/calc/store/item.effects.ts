import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { MatDialog } from '../../../../node_modules/@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { AskItemQuantiy, ItemActionTypes } from './item.actions';

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
}
