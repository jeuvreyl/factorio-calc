import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { DeselecRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input()
  recipes: Recipe[];

  columnsToDisplay = ['icon', 'name', 'ingredients', 'actions'];

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  removeRecipe(recipe: Recipe) {
    this.store.dispatch(new DeselecRecipe(recipe));
  }
}
