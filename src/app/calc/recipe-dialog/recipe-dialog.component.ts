import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { Store } from '@ngrx/store';
import { Item } from '../shared/item.model';
import { Recipe, SimpleRecipe } from '../shared/recipe.model';
import { SelectRecipe } from '../store/recipe.actions';
import { Observable, Subject } from 'rxjs';
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

  selectedCategoryName$: Subject<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private store: Store<State>,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.items$ = this.store.select('itemsConfig', 'items');

    this.recipes$ = this.store.select('recipesConfig', 'recipes');
    this.selectedCategoryName$ = new Subject<string>();
    this.categories$ = this.groupService.getGroups();
    this.selectedRecipes$ = this.store.select('recipesConfig', 'selectedRecipes');

    this.selectableRecipes$ = this.recipes$.pipe(
      combineLatest(this.selectedCategoryName$, this.selectedRecipes$, this.categories$),
      map(([recipes, categoryName, selectedRecipes, categories]) =>
        recipes
          .filter(recipe => this.isRecipeInSelectedCategory(recipe, categoryName, categories))
          .filter(
            recipe =>
              selectedRecipes.find(selectedRecipe => selectedRecipe.name === recipe.name) ===
              undefined
          )
          .filter(recipe => this.isItemRecipeResult(recipe, this.data.items))
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

  private isItemRecipeResult(recipe: Recipe, items: Item[]): boolean {
    const resultItemNames: Set<string> = new Set<string>(recipe.results.map(recipeResult => recipeResult.name));
    let result = false;
    items.forEach(item => {
      if (resultItemNames.has(item.name)) {
        result =  true;
      }
    });
    return result;
  }

  private isRecipeInSelectedCategory(recipe: Recipe, categoryName, categories: Group[]) {
    const selectedCategory = categories.find(category => category.name === categoryName);
    if (selectedCategory) {
      return (
        selectedCategory.subGroups.find(subgroup => subgroup === recipe.subGroup) !== undefined
      );
    }
    return false;
  }
}
