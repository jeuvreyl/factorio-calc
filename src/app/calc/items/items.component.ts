import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../shared/item.model';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { SelectItem, DeselectItem } from '../store/item.actions';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() items: Item[];
  @Input() action: string;

  columnsToDisplay = ['icon', 'itemName', 'actions'];

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  addItem(item: Item) {
    console.log('Add item');
    this.store.dispatch(new SelectItem(item));
  }

  removeItem(id: string) {
    console.log('Remove item');
    this.store.dispatch(new DeselectItem(id));
  }
}
