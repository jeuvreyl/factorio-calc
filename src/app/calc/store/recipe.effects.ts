import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { AssemblingMachineDialogComponent } from '../assembling-machine-dialog/assembling-machine-dialog.component';
import { AskForAssemblingMachine, RecipeActionTypes } from './recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private dialog: MatDialog) {}

  @Effect({ dispatch: false })
  askForItemRecipe$ = this.actions$.pipe(
    ofType<AskForAssemblingMachine>(RecipeActionTypes.ASK_ASSEMBLING_MACHINE),
    map(action => action.payLoad.recipeName),
    map(recipeName =>
      this.dialog.open(AssemblingMachineDialogComponent, {
        width: '250px',
        data: { recipeName: recipeName }
      })
    )
  );
}
