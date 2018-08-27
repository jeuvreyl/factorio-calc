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
        ingredients: [
          {
            id: 'test',
            name: 'test item',
            iconUrl: 'https://wiki.factorio.com/images/Factorio-icon.png'
          }
        ]
      } as Recipe
    ]);
  }
}
