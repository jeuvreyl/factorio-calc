import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { Store } from '@ngrx/store';
import { Item } from '../shared/item.model';
import { Recipe, SimpleRecipe } from '../shared/recipe.model';
import { SelectRecipe } from '../store/recipe.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { Group } from '../shared/group.model';
import { map, combineLatest } from 'rxjs/operators';
import { State } from '../../reducers';
import { GroupService } from '../shared/group.service';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent implements OnInit {
  categories$: Observable<Group[]>;
  items$: Observable<Item[]>;
  recipes$: Observable<Recipe[]>;
  selectableRecipes$: Observable<SimpleRecipe[]>;
  selectedRecipes$: Observable<SimpleRecipe[]>;

  selectedCategoryName$: BehaviorSubject<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private store: Store<State>,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.items$ = this.store.select('itemsConfig', 'items');

    this.recipes$ = this.store.select('recipesConfig', 'recipes');
    this.selectedCategoryName$ = new BehaviorSubject<string>(null);
    this.categories$ = this.groupService.getGroups();
    this.selectedRecipes$ = this.store.select('recipesConfig', 'selectedRecipes');
    this.selectableRecipes$ = this.recipes$.pipe(
      combineLatest(this.selectedCategoryName$, this.selectedRecipes$),
      map(([recipes, categoryName, selectedRecipes]) =>
        recipes
          .filter(recipe => recipe.subGroup === categoryName)
          .filter(
            recipe =>
              selectedRecipes.find(selectedRecipe => selectedRecipe.name === recipe.name) === undefined
          )
          .filter(recipe => this.isItemRecipeResult(recipe, this.data.item))
      )
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectRecipe(recipe: Recipe) {
    this.store.dispatch(new SelectRecipe(recipe));
    this.dialogRef.close();
  }

  selectCategory(categoryName: string) {
    this.selectedCategoryName$.next(categoryName);
  }

  private isItemRecipeResult(recipe: Recipe, item: Item): boolean {
    const resultItemNames: Set<string> = new Set<string>(recipe.results.map(result => result.name));
    return resultItemNames.has(item.name);
  }
}
