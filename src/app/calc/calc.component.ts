import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './shared/item.model';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadItemsSuccess, LoadItemsFail } from './store/item.actions';
import { LoadRecipesFail, LoadRecipesSuccess } from './store/recipe.actions';
import { ItemService } from './shared/item.service';
import { RecipeService } from './shared/recipe.service';
import { Recipe } from './shared/recipe.model';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  selectableItems$: Observable<Item[]>;
  selectedItems$: Observable<Item[]>;

  selectedRecipes$: Observable<Recipe[]>;

  constructor(
    private store: Store<State>,
    private itemService: ItemService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.itemService
      .getItems()
      .subscribe(
        items => this.store.dispatch(new LoadItemsSuccess(items)),
        error => this.store.dispatch(new LoadItemsFail())
      );

    this.recipeService
      .getRecipes()
      .subscribe(
        recipes => this.store.dispatch(new LoadRecipesSuccess(recipes)),
        error => this.store.dispatch(new LoadRecipesFail())
      );

    this.selectedItems$ = this.store.select('itemsConfig', 'selectedItems');
    this.selectableItems$ = this.store.select('itemsConfig', 'items');
    this.selectedRecipes$ = this.store.select('recipesConfig', 'selectedRecipes');
  }
}
