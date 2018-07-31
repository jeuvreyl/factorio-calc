import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../shared/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() items: Item[];

  columnsToDisplay = ['icon', 'itemName', 'actions'];

  constructor() {}

  ngOnInit() {
    console.log(this.items);
  }

  addItem(id: string) {}

  removeItem(id: string) {}
}
