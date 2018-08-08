import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../shared/item.model';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { SelectItem, DeselectItem } from '../store/item.actions';
import { MatDialog } from '../../../../node_modules/@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() items: Item[];
  @Input() action: string;

  columnsToDisplay = ['icon', 'itemName', 'actions'];

  constructor(private dialog: MatDialog, private store: Store<State>) {}

  ngOnInit() {}

  addItem(item: Item) {
    console.log('Add item');
    const dialogRef = this.dialog.open(ItemDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe();

    this.store.dispatch(new SelectItem(item));
  }

  removeItem(id: string) {
    console.log('Remove item');
    this.store.dispatch(new DeselectItem(id));
  }
}
