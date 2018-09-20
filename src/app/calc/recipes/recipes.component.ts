import { Component, OnInit, OnChanges } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Store, select } from '@ngrx/store';
import { State, getRecipes, getSelectedRecipes, getItems } from '../../reducers';
import { DeselecRecipe } from '../store/recipe.actions';
import { SimpleQuantifiedItem, QuantifiedItem } from '../shared/item.model';
import { AskForItemRecipe } from '../store/item.actions';
import { Observable, Subject } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipes$ = this.store.pipe(select(getSelectedRecipes));
  itemsMap = this.store.pipe(select(getItems));

  recipes$ = new Subject<string[]>();

  displayedRecipes$: Observable<Recipe[]>;

  columnsToDisplay = ['icon', 'name', 'results', 'ingredients', 'actions'];

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.displayedRecipes$ = this.store.pipe(
      select(getRecipes),
      combineLatest(this.selectedRecipes$),
      map(([recipesMap, selectedRecipes]) =>
        selectedRecipes.map(recipeName => recipesMap[recipeName])
      )
    );
  }

  openRecipeSelection() {
    this.store.dispatch(
      new AskForItemRecipe(Object.keys(this.itemsMap).map(key => this.itemsMap[key]))
    );
  }

  removeRecipe(recipe: Recipe) {
    this.store.dispatch(new DeselecRecipe(recipe.name));
  }

  buildQuantifiedItems(ingredients: SimpleQuantifiedItem[]): Observable<QuantifiedItem[]> {
    return this.itemsMap.pipe(
      map(itemMap =>
        ingredients.map(ingredient => {
          return {
            ...itemMap[ingredient.name],
            amount: ingredient.amount
          };
        })
      )
    );
  }
}
