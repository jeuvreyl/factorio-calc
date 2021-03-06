import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { combineLatest, map } from 'rxjs/operators';
import { getItems, getSelectableRecipes, State } from '../../reducers';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { Group } from '../shared/group.model';
import { GroupService } from '../shared/group.service';
import { Item } from '../shared/item.model';
import { Recipe, SimpleRecipe } from '../shared/recipe.model';
import { AskForAssemblingMachine } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrls: ['./recipe-dialog.component.css']
})
export class RecipeDialogComponent implements OnInit {
  categories$: Observable<{ [name: string]: Group }>;
  items$: Observable<{ [name: string]: Item }>;
  recipes$: Observable<{ [name: string]: Recipe }>;
  selectableRecipes$: Observable<SimpleRecipe[]>;
  selectedRecipes$: Observable<SimpleRecipe[]>;

  displayedCategories$: Observable<Group[]>;

  selectedCategoryName$: Subject<string>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private store: Store<State>,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.items$ = this.store.pipe(select(getItems));

    this.selectedCategoryName$ = new Subject<string>();
    this.categories$ = this.groupService.getGroups();

    this.displayedCategories$ = this.categories$.pipe(
      map(categories => Object.keys(categories).map(category => categories[category]))
    );

    this.selectableRecipes$ = this.store.pipe(
      select(getSelectableRecipes),
      combineLatest(this.selectedCategoryName$),
      map(([recipes, selectedCategory]) =>
        recipes
          .filter(recipe => recipe.groupName === selectedCategory)
          .filter(recipe => this.isItemRecipeResult(recipe, this.data.items))
      )
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectRecipe(recipe: Recipe) {
    this.dialogRef.close();
    this.store.dispatch(new AskForAssemblingMachine({ recipeName: recipe.name }));
  }

  selectCategory(categoryName: string) {
    this.selectedCategoryName$.next(categoryName);
  }

  private isItemRecipeResult(recipe: Recipe, items: Item[]): boolean {
    const resultItemNames: Set<string> = new Set<string>(
      recipe.results.map(recipeResult => recipeResult.name)
    );
    let result = false;
    items.forEach(item => {
      if (resultItemNames.has(item.name)) {
        result = true;
      }
    });
    return result;
  }
}
