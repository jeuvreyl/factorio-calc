import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipe$: BehaviorSubject<Recipe[]>;

  constructor() {
    this.recipe$ = new BehaviorSubject([
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

  getRecipes(): Observable<Recipe[]> {
    return this.recipe$.asObservable();
  }
}
