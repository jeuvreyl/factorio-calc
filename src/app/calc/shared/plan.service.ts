import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Solver from 'node_modules/javascript-lp-solver';
import { combineLatest, map } from 'rxjs/operators';
import { getFullSelectedRecipes, getRecipes, getSelectedItems, State } from 'src/app/reducers';
import { AssemblingMachine } from './assembling-machine.model';
import { AssemblingMachineService } from './assembling-machine.service';
import { QuantifiedItem } from './item.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private selectedItems$ = this.store.select(getSelectedItems);
  private fullSelectedRecipes$ = this.store.select(getFullSelectedRecipes);
  private selectedAssemblingMachineByRecipe$ = this.assemblingMachineService.getSelectedAssemblingMachineByRecipe();
  private plan$ = this.selectedItems$.pipe(
    combineLatest(this.fullSelectedRecipes$, this.selectedAssemblingMachineByRecipe$),
    map(([targetItems, recipes, assemblingMachineByRecipe]) => {
      const model = {
        optimize: this.buildOptimizeClause(recipes, targetItems),
        opType: 'min',
        constraints: this.buildConstraintsClause(targetItems),
        variables: this.buildVariablesClause(recipes, assemblingMachineByRecipe)
      };
      console.log(model);
      const result = Solver.MultiObjective (model);
      console.log(result);
    })
  );

  constructor(
    private assemblingMachineService: AssemblingMachineService,
    private store: Store<State>
  ) {}

  updatePlan() {
    this.plan$.subscribe();
  }

  /**
   * Constraints will be selected items with the desired amounts
   * @param targetItems items we want to produce
   */
  private buildConstraintsClause(targetItems: QuantifiedItem[]) {
    const constraintClause = {};
    for (const item of targetItems) {
      constraintClause[item.name] = { equal: item.amount };
    }

    return constraintClause;
  }

  /**
   * Optimize clause will be ingredients which are not produced by intermediate recipes and are not in items we want to produce.
   * @param recipes list of recipes to conside
   * @param targetItems items we want to produce
   */
  private buildOptimizeClause(
    recipes: Recipe[],
    targetItems: QuantifiedItem[]
  ): { [ingredient: string]: string } {
    const ingredients = recipes
      .map(recipe => recipe.ingredients)
      .reduce((acc, ingredient) => acc.concat(ingredient))
      .map(ingredient => ingredient.name);

    const products = recipes
      .map(recipe => recipe.results)
      .reduce((acc, result) => acc.concat(result))
      .map(result => result.name);

    const targetItemsName = targetItems.map(item => item.name);

    const ingredientsToMinimize = ingredients
      .filter(ingredient => !products.includes(ingredient))
      .filter(ingredient => !targetItemsName.includes(ingredient));

    const optimizeClause = {};
    for (const ingredient of ingredientsToMinimize) {
      optimizeClause[ingredient] = 'min';
    }

    return optimizeClause;
  }

  /**
   * Variable clause will be sets of selected recipe where ingredients and product amounts
   * will take account of the corresponding machine crafting speed.
   * @param recipes chosen recipes
   * @param assemblingMachineByRecipe chose machine by recipe
   */
  private buildVariablesClause(
    recipes: Recipe[],
    assemblingMachineByRecipe: { [recipeName: string]: AssemblingMachine }
  ) {
    const variablesClause = {};
    for (const recipe of recipes) {
      const assemblingMachine = assemblingMachineByRecipe[recipe.name];
      variablesClause[recipe.name] = {
        ...this.buildIngredients(recipe, assemblingMachine),
        ...this.buildProducts(recipe, assemblingMachine)
      };
    }

    return variablesClause;
  }

  private buildIngredients(
    recipe: Recipe,
    assemblingMachine: AssemblingMachine
  ): { [ingredientName: string]: number } {
    const result = {};
    for (const item of recipe.ingredients) {
      result[item.name] = item.amount / (recipe.energyRequired / assemblingMachine.craftingSpeed);
    }

    return result;
  }

  private buildProducts(
    recipe: Recipe,
    assemblingMachine: AssemblingMachine
  ): { [product: string]: number } {
    const result = {};
    for (const item of recipe.results) {
      result[item.name] = -item.amount / (recipe.energyRequired / assemblingMachine.craftingSpeed);
    }

    return result;
  }
}
