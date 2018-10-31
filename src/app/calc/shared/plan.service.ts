import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs/operators';
import * as SimpleSimplex from 'simple-simplex';
import { getFullSelectedRecipes, getSelectedItems, State } from 'src/app/reducers';
import { AssemblingMachine } from './assembling-machine.model';
import { AssemblingMachineService } from './assembling-machine.service';
import { Recipe } from './recipe.model';
import { QuantifiedItem } from './item.model';

interface Model {
  objective: {
    [recipeName: string]: number;
  };
  constraints: Array<{
    namedVector: {
      [recipeName: string]: number;
    };
    constraints: string;
    constant: number;
  }>;
  optimizationType: string;
}

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
      const solver = new SimpleSimplex(
        this.buildModel(recipes, assemblingMachineByRecipe, targetItems)
      );
      console.log(solver);
      const result = solver.solve({
        methodName: 'simplex'
      });

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

  private buildModel(
    recipes: Recipe[],
    assemblingMachineByRecipe: { [recipeName: string]: AssemblingMachine },
    targetItems: QuantifiedItem[]
  ): Model {
    return {
      optimizationType: 'min',
      objective: this.buildObjective(recipes),
      constraints: this.buildConstraints(recipes, assemblingMachineByRecipe, targetItems)
    };
  }

  private buildConstraints(
    recipes: Recipe[],
    assemblingMachineByRecipe: { [recipeName: string]: AssemblingMachine },
    targetItems: QuantifiedItem[]
  ) {
    const itemsWithTotalAmountByRecipe = recipes
      .map(recipe => {
        const assemblingMachine = assemblingMachineByRecipe[recipe.name];
        const ingredients = this.buildIngredients(recipe, assemblingMachine);
        const results = this.buildProducts(recipe, assemblingMachine);

        const itemsWithTotalAmount = {};
        for (const key of Object.keys(ingredients)) {
          const ingredientAmount = ingredients[key];
          const resultAmount = results[key];
          let amount;
          if (resultAmount) {
            amount = ingredientAmount + resultAmount;
          } else {
            amount = ingredientAmount;
          }
          itemsWithTotalAmount[key] = {
            recipeName: recipe.name,
            amount: amount
          };
        }
        const knownItems = Object.keys(itemsWithTotalAmount);
        for (const product of recipe.results) {
          const productName = product.name;
          if (!knownItems.includes(productName)) {
            itemsWithTotalAmount[productName] = {
              recipeName: recipe.name,
              amount: product.amount
            };
          }
        }

        return itemsWithTotalAmount;
      })
      .reduce((acc, itemsWithTotalAmount) => {
        for (const itemName of Object.keys(itemsWithTotalAmount)) {
          const recipeNameWithAmount = itemsWithTotalAmount[itemName];
          const currentRecipWithAmountForItem = acc[itemName];

          acc[itemName] = {
            ...currentRecipWithAmountForItem,
            [recipeNameWithAmount.recipeName]: recipeNameWithAmount.amount
          };
        }
        return acc;
      }, {});

    const constraints = [];
    const constraint = '<=';
    const itemNames = Object.keys(itemsWithTotalAmountByRecipe);
    for (const itemName of itemNames) {
      const targetItem = targetItems.find(item => itemName === item.name);
      let constant;
      if (targetItem) {
        constant = targetItem.amount;
      } else {
        constant = 0;
      }
      constraints.push({
        namedVector: itemsWithTotalAmountByRecipe[itemName],
        constraint: constraint,
        constant: constant
      });
    }

    return constraints;
  }

  private buildObjective(recipes: Recipe[]): { [recipeName: string]: number } {
    return recipes.map(recipe => ({ [recipe.name]: 1 })).reduce((acc, objective) => {
      return {
        ...acc,
        ...objective
      };
    }, {});
  }
  private buildIngredients(
    recipe: Recipe,
    assemblingMachine: AssemblingMachine
  ): { [ingredientName: string]: number } {
    const result = {};
    for (const item of recipe.ingredients) {
      result[item.name] = -item.amount / (recipe.energyRequired / assemblingMachine.craftingSpeed);
    }

    return result;
  }

  private buildProducts(
    recipe: Recipe,
    assemblingMachine: AssemblingMachine
  ): { [product: string]: number } {
    const result = {};
    for (const item of recipe.results) {
      result[item.name] = item.amount / (recipe.energyRequired / assemblingMachine.craftingSpeed);
    }

    return result;
  }
}
