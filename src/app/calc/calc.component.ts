import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemService } from './shared/item.service';
import { Item } from './shared/item.model';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  items$: Observable<Item[]>;

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.items$ = this.itemService.getItems();
  }
}
