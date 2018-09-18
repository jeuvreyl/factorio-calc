import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { DeselecRecipe } from '../store/recipe.actions';
import { Item } from '../shared/item.model';
import { AskForItemRecipe } from '../store/item.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  @Input()
  recipes: Recipe[];

  @Input()
  items: Item[];

  columnsToDisplay = ['icon', 'name', 'ingredients', 'actions'];

  constructor(private store: Store<State>) {}

  ngOnInit() { }

  openRecipeSelection() {
    this.store.dispatch(new AskForItemRecipe(this.items));
  }

  removeRecipe(recipe: Recipe) {
    this.store.dispatch(new DeselecRecipe(recipe));
  }
}
