import { Component, OnInit, Inject, InjectionToken } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Item, QuantifiedItem, SimpleQuantifiedItem } from '../shared/item.model';

export const TOOLTIP_DATA = new InjectionToken<Recipe>('TooltipData');

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe;

  ingredients: QuantifiedItem[];
  results: QuantifiedItem[];

  constructor(@Inject(TOOLTIP_DATA) private data: any) {}

  ngOnInit() {
    this.recipe = this.data.recipe;
    const items = this.data.items;

    this.ingredients = this.recipe.ingredients.map(ingredient =>
      this.buildQuantifiedItem(items.find(item => item.name === ingredient.name), ingredient)
    );
    this.results = this.recipe.results.map(result =>
      this.buildQuantifiedItem(items.find(item => item.name === result.name), result)
    );
  }

  private buildQuantifiedItem(item: Item, ingredient: SimpleQuantifiedItem): QuantifiedItem {
    return {
      ...item,
      quantity: ingredient.quantity
    };
  }
}
