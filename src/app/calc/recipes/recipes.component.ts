import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../shared/recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input()
  recipes: Recipe[];

  columnsToDisplay = ['icon', 'name', 'ingredients', 'actions'];

  constructor() {}

  ngOnInit() {}

  removeRecipe(recipe: Recipe) {}
}
