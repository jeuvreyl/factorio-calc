import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './shared/item.model';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { LoadItems } from './store/item.actions';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  selectableItems$: Observable<Item[]>;
  selectedItems$: Observable<Item[]>;

  constructor(private store: Store<State>) {
    this.store.dispatch(new LoadItems());
  }

  ngOnInit() {
    this.selectableItems$ = this.store.pipe(select('itemsConfig', 'items'));
    this.selectedItems$ = this.store.pipe(select('itemsConfig', 'selectedItems'));
  }
}
