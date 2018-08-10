import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Item } from '../shared/item.model';
import { AskItemQuantiy, DeselectItem } from '../store/item.actions';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() items: Item[];
  @Input() action: string;
  @Input() withQuantity: boolean;

  columnsToDisplay = ['icon', 'name', 'actions'];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    if (this.withQuantity) {
      this.columnsToDisplay.push('quantity');
    }
  }

  addItem(item: Item) {
    this.store.dispatch(new AskItemQuantiy(item));
  }

  removeItem(id: string) {
    this.store.dispatch(new DeselectItem(id));
  }
}
