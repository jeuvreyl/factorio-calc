import { NgModule } from '@angular/core';
import { EffectsModule } from '../../../node_modules/@ngrx/effects';
import { AssemblingMachineDialogComponent } from './assembling-machine-dialog/assembling-machine-dialog.component';
import { AssemblingMachineComponent } from './assembling-machine/assembling-machine.component';
import { CalcComponent } from './calc.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { ItemsComponent } from './items/items.component';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ResultsComponent } from './results/results.component';
import { ItemService } from './shared/item.service';
import { SharedModule } from './shared/shared.module';
import { ItemEffects } from './store/item.effects';
import { RecipeEffects } from './store/recipe.effects';

@NgModule({
  imports: [SharedModule, EffectsModule.forFeature([ItemEffects, RecipeEffects])],
  declarations: [
    CalcComponent,
    IngredientsComponent,
    ItemsComponent,
    ItemDialogComponent,
    RecipeComponent,
    RecipesComponent,
    RecipeDialogComponent,
    ResultsComponent,
    AssemblingMachineDialogComponent,
    AssemblingMachineComponent
  ],
  entryComponents: [
    ItemDialogComponent,
    RecipeDialogComponent,
    AssemblingMachineDialogComponent,
    RecipeComponent
  ],
  providers: [ItemService],
  exports: [CalcComponent]
})
export class CalcModule {}
