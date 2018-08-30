import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material/dialog';
import { Store } from '../../../../node_modules/@ngrx/store';
import { Item } from '../shared/item.model';
import { SelectItem, AskForItemRecipe } from '../store/item.actions';
import { State } from '../../reducers';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {
  public currentItem: Item;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private store: Store<State>
  ) {}

  ngOnInit() {
    // copy item object
    this.currentItem = Object.assign({}, this.data.item);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  pushQuantity() {
    this.store.dispatch(new SelectItem(this.currentItem));
    this.store.dispatch(new AskForItemRecipe(this.currentItem));
    this.dialogRef.close();
  }
}
