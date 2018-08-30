import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { Store } from '@ngrx/store';
import { Item } from '../shared/item.model';
import { Recipe } from '../shared/recipe.model';
import { SelectRecipe } from '../store/recipe.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { Category } from '../shared/category.model';
import { map, combineLatest } from 'rxjs/operators';
import { State } from '../../reducers';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent implements OnInit {
  categories$: Observable<Set<Category>>;
  recipes$: Observable<Recipe[]>;
  selectableRecipes$: Observable<Recipe[]>;
  selectedRecipes$: Observable<Recipe[]>;

  selectedCategoryName$: BehaviorSubject<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.recipes$ = this.store.select('recipesConfig', 'recipes');
    this.selectedCategoryName$ = new BehaviorSubject<string>(null);
    this.categories$ = this.recipes$.pipe(
      map(recipes => recipes.filter(recipe => this.isItemRecipeResult(recipe, this.data.item))),
      map(recipes => recipes.map(recipe => recipe.category)),
      map(categoryNames => this.buildCategories(categoryNames))
    );
    this.selectedRecipes$ = this.store.select('recipesConfig', 'selectedRecipes');
    this.selectableRecipes$ = this.recipes$.pipe(
      combineLatest(this.selectedCategoryName$, this.selectedRecipes$),
      map(([recipes, categoryName, selectedRecipes]) =>
        recipes
          .filter(recipe => recipe.category === categoryName)
          .filter(
            recipe =>
              selectedRecipes.find(selectedRecipe => selectedRecipe.id === recipe.id) === undefined
          )
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

  private buildCategories(categoryNames: Array<string>): Set<Category> {
    const result = new Set<Category>();
    const categoryCreated = new Set<string>();
    for (const name of categoryNames) {
      if (!categoryCreated.has(name)) {
        result.add({
          name: name,
          iconUrl: 'https://wiki.factorio.com/images/Factorio-icon.png'
        });
      }
    }
    return result;
  }

  private isItemRecipeResult(recipe: Recipe, item: Item): boolean {
    const resultItemNames: Set<string> = new Set<string>(recipe.results);
    return resultItemNames.has(item.name);
  }
}
