import { Component, OnInit, Input } from '@angular/core';
import { QuantifiedItem } from '../shared/item.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.css']
})
export class IngredientsComponent implements OnInit {

  @Input()
  ingredients: QuantifiedItem[];

  constructor() { }

  ngOnInit() {
  }

}
