import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor() {}

  getRecipes(): Observable<Recipe[]> {
    return of([
      {
        id: 'test',
        name: 'nom test',
        subGroup: 'test',
        iconUrl: 'https://wiki.factorio.com/images/Factorio-icon.png',
        ingredients: [
          {
            name: 'test item',
            quantity: 5
          }
        ],
        results: [
          {
            name: 'test item',
            quantity: 5
          }
        ]
      } as Recipe
    ]);
  }
}
