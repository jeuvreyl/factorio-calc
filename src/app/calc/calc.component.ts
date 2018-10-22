import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SimpleItem, Item } from './shared/item.model';
import { Store, select } from '@ngrx/store';
import { State, getSelectedItems, getSelectableItems, getItems } from '../reducers';
import { LoadItemsSuccess, LoadItemsFail } from './store/item.actions';
import { LoadRecipesFail, LoadRecipesSuccess } from './store/recipe.actions';
import { ItemService } from './shared/item.service';
import { RecipeService } from './shared/recipe.service';
import { PlanService } from './shared/plan.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  selectableItems$: Observable<SimpleItem[]>;
  selectedItems$: Observable<SimpleItem[]>;
  items$: Observable<{ [name: string]: Item }>;

  constructor(
    private store: Store<State>,
    private itemService: ItemService,
    private planService: PlanService,
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

    this.selectedItems$ = this.store.pipe(select(getSelectedItems));
    this.selectableItems$ = this.store.pipe(
      select(getSelectableItems),
      map(items => items.map(item => item as SimpleItem))
    );
    this.items$ = this.store.pipe(select(getItems));
  }

  updatePlan() {
    this.planService.updatePlan();
  }
}
