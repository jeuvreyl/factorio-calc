import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Item } from '../shared/item.model';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  @Input()
  recipe: Recipe;
  ingredients: Item[];
  results: Item[];

  constructor(private store: Store<State>) { }

  ngOnInit() {
    const items$ = this.store.select('itemsConfig', 'items');
  }

}
