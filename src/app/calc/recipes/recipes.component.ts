import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';
import { getItems, getRecipes, getSelectedRecipes, State } from '../../reducers';
import { AssemblingMachine } from '../shared/assembling-machine.model';
import { AssemblingMachineService } from '../shared/assembling-machine.service';
import { QuantifiedItem, SimpleQuantifiedItem } from '../shared/item.model';
import { Recipe } from '../shared/recipe.model';
import { AskForItemRecipe } from '../store/item.actions';
import { DeselecRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipes$ = this.store.pipe(select(getSelectedRecipes));
  itemsMap$ = this.store.pipe(select(getItems));
  displayedRecipes$: Observable<Recipe[]> = this.store.pipe(
    select(getRecipes),
    combineLatest(this.selectedRecipes$),
    map(([recipesMap, selectedRecipes]) =>
      selectedRecipes.map(recipeName => recipesMap[recipeName])
    )
  );
  displayRecipeSelection$ = new Subject<void>();
  columnsToDisplay = ['icon', 'name', 'results', 'ingredients', 'machines', 'actions'];

  constructor(
    private assemblingMachineService: AssemblingMachineService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.displayRecipeSelection$
      .pipe(
        combineLatest(this.itemsMap$, this.displayedRecipes$),
      map(([_, items, recipes]) => {
        const ingredients = recipes.map(recipe => recipe.ingredients)
          .reduce((acc, result) => acc.concat(result))
          .map(ingredient => ingredient.name);
          return Object.keys(items).map(key => items[key]).filter(item => ingredients.includes(item.name));
        })
      )
      .subscribe(items => this.store.dispatch(new AskForItemRecipe(items)));
  }

  openRecipeSelection() {
    this.displayRecipeSelection$.next();
  }

  removeRecipe(recipe: Recipe) {
    this.store.dispatch(new DeselecRecipe(recipe.name));
  }

  buildQuantifiedItems(ingredients: SimpleQuantifiedItem[]): Observable<QuantifiedItem[]> {
    return this.itemsMap$.pipe(
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

  getSelectedMachine(recipe: Recipe): Observable<AssemblingMachine> {
    return this.assemblingMachineService.getSelectedAssemblingMachine(recipe.name);
  }
}
