import { Component, Input, OnInit, ViewChild,  OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { Item } from '../shared/item.model';
import { AskItemQuantiy, DeselectItem } from '../store/item.actions';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit, OnChanges {
  @Input()
  items: Item[];
  @Input()
  action: string;
  @Input()
  withQuantity: boolean;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  columnsToDisplay = ['icon', 'name', 'actions'];
  datasource: MatTableDataSource<Item>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    if (this.withQuantity) {
      this.columnsToDisplay.push('quantity');
    }
  }

  ngOnChanges(): void {
    this.datasource = new MatTableDataSource<Item>(this.items);
    this.datasource.paginator = this.paginator;
  }

  addItem(item: Item) {
    this.store.dispatch(new AskItemQuantiy(item));
  }

  removeItem(item: Item) {
    this.store.dispatch(new DeselectItem(item));
  }
}
