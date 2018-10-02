import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<{[name: string]: Recipe}> {
    return this.http.get<{[name: string]: Recipe}>('./assets/dataset/recipes.json');
  }
}
