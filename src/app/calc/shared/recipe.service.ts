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
        category: 'test',
        iconUrl: '',
        ingredients: ['test item'],
        results: ['test item']
      } as Recipe
    ]);
  }
}
