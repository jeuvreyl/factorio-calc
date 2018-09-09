import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('./assets/dataset/recipes.json');
  }
}
